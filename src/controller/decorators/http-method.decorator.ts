export function DGet(path: string): MethodDecorator {
  return function (target, propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
    const routes = Reflect.getMetadata("routes", target.constructor) || [];
    routes.push({ method: "get", path, handlerName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}

export function DPost(path: string): MethodDecorator {
  return function (target, propertyKey: string | symbol, _descriptor: PropertyDescriptor) {
    const routes = Reflect.getMetadata("routes", target.constructor) || [];
    routes.push({ method: "post", path, handlerName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}
