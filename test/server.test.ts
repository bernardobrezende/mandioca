import test from 'ava';

import { initializeServer } from '../src/server';

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
