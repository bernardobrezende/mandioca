# mandioca

A low-cerimony web-first Node.js HTTP framework.

![min coverage badge](https://img.shields.io/nycrc/bernardobrezende/mandioca?style=flat-square)

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
2. routes params
3. error handler
4. logs by default
5. health check by default
6. lint
7. remove ! e handle each case
8. cors
9. security headers (helmet)
