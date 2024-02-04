import { DSingleton } from "#/common/decorators";

export function DClient(baseUriKey: string): ClassDecorator {
  return function (constructor: Function) {
    constructor.prototype.baseUri = process.env[baseUriKey];

    DSingleton(constructor as any);
  };
}
