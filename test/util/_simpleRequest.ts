import http from 'http';

export const get = (fullPath : string) => {
  // "http://localhost:3798/foo"
  // [ 'http', ':', '/', '/localhost', ':3798', '/foo' ]
  const [,,,hostname, port, path] = fullPath.split(/(?=\/|:)/);

  return new Promise((resolve) => {
    const request = http.request({
      hostname: hostname.slice(1),
      port: Number(port.slice(1)),
      path,
      method: 'GET'
    }, res => {
      let chunks = new Uint8Array();
      res.on('data', chunk => {
        chunks = new Uint8Array([ ...chunks, ...new Uint8Array(chunk) ]);
      })
      res.on('end', () => {
        resolve(Buffer.from(chunks).toString());
      });
    });
    request.end();
  })
}
