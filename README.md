# mandioca

A low-cerimony web-first Node.js HTTP framework.

![coverage badge](https://img.shields.io/codecov/c/gh/bernardobrezende/mandioca)

```
import mandioca from 'mandioca';

mandioca
  .serve(8888)
  .then(({ address, port }) => {
    console.log(`server running on ${ address }:${ port }`);
  });

mandioca.get(`/hello-world`, req => ({ hello: 'world' }));
```

### TODO

1. tests
2. no return on route handler bug
3. error handler / request on error / response on error
4. routes params
5. logs by default
6. health check by default
7. lint
8. remove ! e handle each case
9. cors
10. security headers (helmet)
