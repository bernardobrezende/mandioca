import test from 'ava';
import { get, post } from './util/_simpleRequest';

import mandioca from '../src/mandioca';

test('serve create server and start listening on port', async t => {
  const { address, port } = await mandioca.serve(4613);
  t.is(port, 4613);
  t.is(address, '::');
});

test('get register route listener', async t => {
  await mandioca.serve(4615);
  mandioca.get('/myget', () => {
    return { my: 'get' };
  });
  const { statusCode, data } = await get('http://localhost:4615/myget');
  t.is(statusCode, 200);
  t.is(data, '{"my":"get"}');
});

test('post register route listener', async t => {
  await mandioca.serve(4616);
  mandioca.post('/mypost', () => {
    return { my: 'post' };
  });
  const { statusCode, data } = await post('http://localhost:4616/mypost', '');
  t.is(statusCode, 201);
  t.is(data, '{"my":"post"}');
});
