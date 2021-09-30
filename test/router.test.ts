import test from 'ava';
import { registerRoute, routeExists, routeHandler } from '../src/router';

const dummyHandler = () => {};

test('registerRoute with url and handler adds router', t => {
  t.false(routeExists('/foo'));
  registerRoute('/foo', dummyHandler);
  t.true(routeExists('/foo'));
});

test('registerRoute with duplicated route throws an error', t => {
  registerRoute('/a-route', dummyHandler);
  t.throws(() => {
    registerRoute('/a-route', dummyHandler);
  }, { message: 'route /a-route already declared.' });
});

test('routeExists with non-existent route returns false', t => {
  t.false(routeExists('/new-route'));
});

test('routeExists with existent route returns true', t => {
  registerRoute('/new-route', dummyHandler);
  t.true(routeExists('/new-route'));
});

test('routeHandler with existent url returns respective handler', t => {
  registerRoute('/my-route', dummyHandler);
  t.deepEqual(routeHandler('/my-route'), dummyHandler);
});

test('routeHandler with non-existent url throws an error', t => {
  t.throws(() => {
    routeHandler('/non-existent')
  }, { message: 'route handler /non-existent was not found. you must call registerRoute before.' });
});
