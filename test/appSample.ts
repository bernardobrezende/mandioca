import { HttpRequest } from '../src/http';
import mandioca from '../src/mandioca';

mandioca
  .serve(8888)
  .then(({ address, port }) => {
    console.log(`server running on ${ address }:${ port }`);
  });

mandioca.get(`/hello`, (req: HttpRequest) => ({ foo: `bar1 ${ req.search['uid'] }` }));
mandioca.get(`/hello2`, () => ({ foo: 'bar2' }));

const posts = [];
mandioca.post(`/post`, (req: HttpRequest) => {
  posts.push(req.body);
});
