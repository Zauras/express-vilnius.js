import "reflect-metadata";

import { DSingleton } from "#/common/decorators";

function DController(path: string = ""): ClassDecorator {
  return function (constructor: Function) {
    Reflect.defineMetadata("path", path, constructor);
    if (!Reflect.hasMetadata("routes", constructor)) {
      Reflect.defineMetadata("routes", [], constructor);
    }

    DSingleton(constructor as any);
  };
}

export { DController };
