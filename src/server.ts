import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { AddressInfo } from 'net';
import url from 'url';

import { notFound, ok, HttpRequest, created, internalServerError } from './http';
import { routeExists, routeHandler } from './router';
import { SearchParams, removeQueryParams } from './url';

const createRequest = async (req: IncomingMessage) : Promise<HttpRequest> => {
  const search = url.parse(req.url!, true).query;
  const body = await readRequestBodyAsync(req);
  return {
    url: req.url,
    search: search as SearchParams,
    body
  }
}

const readRequestBodyAsync = (req: IncomingMessage) : Promise<JSON> => {
  return new Promise((resolve, reject) => {
    let chunks = new Uint8Array();
    let body;
    req.on('data', chunk => {
      chunks = new Uint8Array([ ...chunks, ...new Uint8Array(chunk) ]);
    }).on('end', () => {
      body = Buffer.from(chunks).toString();
      // TODO: add future encodings here
      resolve(JSON.parse(body || '{}'));
    });
  });
}

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req;
  const sanitizedUrl = removeQueryParams(url!);
  if (routeExists(sanitizedUrl)) {
    const handler = routeHandler(sanitizedUrl);
    const request : HttpRequest = await createRequest(req);
    let routeResponse;
    try {
      routeResponse = handler(request);
    } catch (internalErr) {
      internalServerError(res, internalErr as Error);
    }
    if (req.method === "POST") {
      created(res, routeResponse);
    } else {
      ok(res, routeResponse);
    }
  } else {
    notFound(res);
  }
}

export const createServer = () : Server => http.createServer(requestListener);

export const initializeServer = (server: Server, port: number) : Promise<AddressInfo> => {
  if (!port) {
    throw new Error('Please, provide a valid port.');
  }
  return new Promise<AddressInfo>((resolve, reject) => {
    try {
      server.listen(port, () => {
        resolve(server.address() as AddressInfo);
      });
    } catch (err) {
      console.error((err as Error).stack);
      reject(err);
    }
  });
}

process
  .on('uncaughtException', err => {
    // TODO: is it possible to simulate this scenario?
    console.error(`Fatal error. Shuting down server...\n`, err.stack);
    process.exit(1);
  });
