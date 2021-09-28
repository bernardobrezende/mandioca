import test from 'ava';
import { removeQueryParams } from '../src/url';

test('removeQueryParams with query params should remove query strings', t => {
  t.is(removeQueryParams(
    'http://localhost:8888/myroute?param1=value1&param2=value2'),
    'http://localhost:8888/myroute');
});

test('removeQueryParams with empty string return empty', t => {
  t.is(removeQueryParams(''), '');
});

test('removeQueryParams with undefined should return undefined', t => {
  t.is(removeQueryParams(undefined!), undefined);
});
