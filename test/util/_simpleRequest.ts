import http, { OutgoingHttpHeaders } from 'http';

type SimpleResponse = {
  statusCode: number,
  data?: string
};

const request = (fullPath: string, method: string, headers: OutgoingHttpHeaders = {}, data?: string)
  : Promise<SimpleResponse> => {
  // "http://localhost:3798/foo"
  // [ 'http', ':', '/', '/localhost', ':3798', '/foo' ]
  const [,,,hostname, port, path] = fullPath.split(/(?=\/|:)/);

  return new Promise((resolve) => {
    const request = http.request({
      hostname: hostname.slice(1),
      port: Number(port.slice(1)),
      path,
      method,
      headers
    }, res => {
      let chunks = new Uint8Array();
      res.on('data', chunk => {
        chunks = new Uint8Array([ ...chunks, ...new Uint8Array(chunk) ]);
      })
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode!,
          data: Buffer.from(chunks).toString()
        });
      });
    });
    if (data?.length) {
      request.write(data);
    }
    request.end();
  });
};

export const get = (fullPath : string) => request(fullPath, 'GET');

export const post = (fullPath : string, data : string) : Promise<SimpleResponse> => {
  return request(fullPath, 'POST', {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }, data);
}
