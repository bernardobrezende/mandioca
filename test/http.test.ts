import test from 'ava';
import * as TypeMoq from "typemoq";

import { ServerResponse } from 'http';
import { ok, created, notFound } from '../src/http';

test('ok with return data should write headers and serialize JSON', t => {
  const mock = TypeMoq.Mock.ofType<ServerResponse>();

  ok(mock.object, { foo: 'bar' });

  mock.verify(x => x.writeHead(200,
    TypeMoq.It.isObjectWith({ 'Content-Type': 'application/json' })),
    TypeMoq.Times.once());
  mock.verify(x => x.write("{\"foo\":\"bar\"}"), TypeMoq.Times.once())
  mock.verify(x => x.end(), TypeMoq.Times.once());

  t.pass();
});

test('ok with no return data should not serialize JSON', t => {
  const mock = TypeMoq.Mock.ofType<ServerResponse>();

  ok(mock.object);

  mock.verify(x => x.writeHead(200,
    TypeMoq.It.isObjectWith({ 'Content-Type': 'application/json' })),
    TypeMoq.Times.once());
  mock.verify(x => x.write(TypeMoq.It.isAnyString()), TypeMoq.Times.never());
  mock.verify(x => x.end(), TypeMoq.Times.once());

  t.pass();
});

//

test('created with return data should write headers and serialize JSON', t => {
  const mock = TypeMoq.Mock.ofType<ServerResponse>();

  created(mock.object, { foo: 'bar' });

  mock.verify(x => x.writeHead(201,
    TypeMoq.It.isObjectWith({ 'Content-Type': 'application/json' })),
    TypeMoq.Times.once());
  mock.verify(x => x.write("{\"foo\":\"bar\"}"), TypeMoq.Times.once())
  mock.verify(x => x.end(), TypeMoq.Times.once());

  t.pass();
});

test('created with no return data should not serialize JSON', t => {
  const mock = TypeMoq.Mock.ofType<ServerResponse>();

  created(mock.object);

  mock.verify(x => x.writeHead(201,
    TypeMoq.It.isObjectWith({ 'Content-Type': 'application/json' })),
    TypeMoq.Times.once());
  mock.verify(x => x.write(TypeMoq.It.isAnyString()), TypeMoq.Times.never());
  mock.verify(x => x.end(), TypeMoq.Times.once());

  t.pass();
});

test('notFound should write head and string', t => {
  const mock = TypeMoq.Mock.ofType<ServerResponse>();

  notFound(mock.object);

  mock.verify(x => x.writeHead(404), TypeMoq.Times.once());
  mock.verify(x => x.write('Not found'), TypeMoq.Times.once());
  mock.verify(x => x.end(), TypeMoq.Times.once());

  t.pass();
});
