import { DSingleton } from "#/common/decorators";
import { IDClientArgs } from "#/client/types";

export function DClient({ baseUri = "" }: IDClientArgs = {}) {
  return function (constructor: Function) {
    constructor.prototype.baseUri = process.env[baseUri];

    DSingleton(constructor as any);
  };
}
