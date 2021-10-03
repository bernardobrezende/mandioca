import { ServerResponse } from 'http';
import { SearchParams } from './url';

export function notFound(res: ServerResponse) : void {
  res.writeHead(404);
  res.write('Not found');
  res.end();
};

const writeJsonInsideResponse = (res: ServerResponse, statusCode: number, data?: unknown) : void => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  if (data) {
    res.write(JSON.stringify(data));
  }
  res.end();
}

export function ok(res: ServerResponse, data?: unknown) : void {
  writeJsonInsideResponse(res, 200, data);
}

export function created(res: ServerResponse, data?: unknown) : void {
  writeJsonInsideResponse(res, 201, data);
}

export function internalServerError(res: ServerResponse, error : Error) : void {
  console.error(error.stack);
  res.writeHead(500);
  res.end();
}

export type HttpRequest = {
  search: SearchParams,
  url?: string,
  body?: JSON // TODO: create own dynamic type
};
