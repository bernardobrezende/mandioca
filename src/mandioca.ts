import { AddressInfo } from 'net';
import { registerRoute, RouteHandler } from './router';
import { createServer, initializeServer } from './server';

const mandioca = {
  get: (path: string, routeImpl: RouteHandler) : void => {
    registerRoute(path, routeImpl);
  },
  post: (path: string, routeImpl: RouteHandler) : void => {
    registerRoute(path, routeImpl);
  },
  serve: (port: number) : Promise<AddressInfo> => initializeServer(createServer(), port)
};

export default mandioca;
