import { HttpRequest } from './http';

const routers = new Map<string, RouteHandler>();

// TODO: generics return type here
export type RouteHandler = (req: HttpRequest) => unknown;

export function routeExists(url: string) : boolean {
  return routers.has(url);
}

export function routeHandler(url : string) : RouteHandler {
  const handler = routers.get(url);
  if (!handler) {
    throw new Error(`route handler ${ url } was not found. you must call registerRoute before.`);
  }
  return handler;
}

export function registerRoute(url: string, handler: RouteHandler) {
  if (routeExists(url)) {
    throw new Error(`route ${ url } already declared.`);
  }
  routers.set(url, handler);
}
