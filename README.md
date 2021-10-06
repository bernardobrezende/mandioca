# mandioca

A low-cerimony web-first Node.js HTTP framework.

![coverage badge](https://img.shields.io/codecov/c/gh/bernardobrezende/mandioca)

```typescript
import mandioca from 'mandioca';

mandioca
  .serve(8888)
  .then(({ address, port }) => {
    console.log(`server running on ${ address }:${ port }`);
  });

mandioca.get(`/hello-world`, req => ({ hello: 'world' }));
```
