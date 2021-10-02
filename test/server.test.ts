import test from 'ava';

import { registerRoute } from '../src/router';

import { createServer, initializeServer } from '../src/server';
import { get } from './util/_simpleRequest';

const createServerStub = (address: string, port: number) => ({
  address: () => ({ address, port }),
  listen: (port : number, listenCallback: () => void) => {
    listenCallback();
  }
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
  const res = await get('http://localhost:7894/foo');
  server.close();
  t.is('{"foo":"bar"}', res);
});


