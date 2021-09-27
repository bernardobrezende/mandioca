import { AddressInfo } from 'net';
import { registerRoute, RouteHandler } from './router';
import { initializeServer } from './server';

const mandioca = {
  get: function(path: string, routeImpl: RouteHandler) : void {
    registerRoute(path, routeImpl);
  },
  post: function(path: string, routeImpl: RouteHandler) : void {
    registerRoute(path, routeImpl);
  },
  serve: (port: number) : Promise<AddressInfo> => initializeServer(port)
};

export default mandioca;
