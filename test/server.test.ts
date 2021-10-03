import test from 'ava';

import { registerRoute } from '../src/router';

import { createServer, initializeServer } from '../src/server';
import { get, post } from './util/_simpleRequest';

const createServerStub = (address: string, port: number) => ({
  address: () => ({ address, port }),
  listen: (port : number, listenCallback: () => void) => {
    listenCallback();
  },
  on: () => {}
});

test('initializeServer with no port throws an error', async t => {
  await t.throwsAsync(async () => {
    initializeServer(createServerStub('localhost', 9467) as any, undefined!);
  }, { message: 'Please, provide a valid port.' });
});

test('initializeServer with valid port resolves with valid address', async t => {
  const { address, port } = await initializeServer(createServerStub('localhost', 9467) as any, 9467);
  t.is(address, 'localhost');
  t.is(9467, port);
});

test('createServer requestListener with get method', async t => {
  const server = createServer();
  registerRoute('/foo', () => ({ foo: 'bar' }));
  await initializeServer(server, 7894);
  const { data } = await get('http://localhost:7894/foo');
  server.close();
  t.is('{"foo":"bar"}', data);
});

test('createServer requestListener with get method and not found route', async t => {
  const server = createServer();
  registerRoute('/foo2', () => ({ foo2: 'bar' }));
  await initializeServer(server, 7895);
  const { statusCode, data } = await get('http://localhost:7895/notfound');
  server.close();
  t.is(404, statusCode);
  t.is('Not found', data);
});

test('createServer requestListener with get method with params', async t => {
  const server = createServer();
  registerRoute('/foo3', () => ({ foo3: 'bar' }));
  await initializeServer(server, 7896);
  const { data } = await get('http://localhost:7896/foo3?param1=value1');
  server.close();
  t.is('{"foo3":"bar"}', data);
});

test('initializeServer with post request', async t => {
  const server = createServer();
  registerRoute('/person', (req) => {
    t.is('John Doe', (req.body as any).name);
  });
  await initializeServer(server, 7897);
  const { statusCode } = await post('http://localhost:7897/person', JSON.stringify({
    name: 'John Doe'
  }));
  t.is(201, statusCode);
  server.close();
});

test('initializeServer with error inside request handler', async t => {
  const server = createServer();
  registerRoute('/error', (req) => {
    const provokeError = () => JSON.parse(req.body!.toString()).name;
    provokeError();
  });
  await initializeServer(server, 7898);
  const { statusCode } = await post('http://localhost:7898/error', JSON.stringify({
    name: 'John Doe'
  }));
  t.is(500, statusCode);
  server.close();
});

test('initializeServer with duplicated port throws server error and reject promise', async t => {
  const server = createServer();
  await initializeServer(server, 7318);
  await t.throwsAsync(async () => {
    await initializeServer(server, 7318);
  }, { message: 'Listen method has been called more than once without closing.' });
  server.close();
});
