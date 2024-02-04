import { IControllerRespDto } from "#/controller/types";
import { EHttpMethod } from "#/common/http-methods";
import { IReqExpress, IRespExpress } from "#/common/types";

function createHttpDecorator<TRespData>(method: EHttpMethod): (path: string) => MethodDecorator {
  return function (path: string = ""): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
      descriptor.value = async function (...args: any[]) {
        const originalMethod = descriptor.value;
        const [req, resp] = args as [IReqExpress, IRespExpress];

        try {
          const respDto: IControllerRespDto<TRespData> = await originalMethod.apply(this, args);
          if (!respDto) return;

          if (respDto.headers) {
            Object.entries(respDto.headers).forEach(([key, value]) => resp.setHeader(key, value));
          }

          if (respDto.cookies) {
            respDto.cookies.forEach(({ name, value, options }) =>
              resp.cookie(name, value, options || {})
            );
          }

          resp.status(respDto.status || 200);
          resp.json(respDto.data);
        } catch (error) {
          console.error(
            `Error during @${method.toUpperCase()} execution for ${propertyKey.toString()}:`,
            error
          );
          resp.status(500).send("Internal Server Error");
        }
      };

      const routes = Reflect.getMetadata("routes", target.constructor) || [];
      routes.push({ method, path: propertyKey.toString(), handlerName: propertyKey });
      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
}

const DHttpGet = createHttpDecorator(EHttpMethod.Get);
const DHttpPost = createHttpDecorator(EHttpMethod.Post);
const DHttpPut = createHttpDecorator(EHttpMethod.Put);
const DHttpDelete = createHttpDecorator(EHttpMethod.Delete);
const DHttpPatch = createHttpDecorator(EHttpMethod.Patch);
const DHttpOptions = createHttpDecorator(EHttpMethod.Options);
const DHttpHead = createHttpDecorator(EHttpMethod.Head);

export { DHttpGet, DHttpPost, DHttpPut, DHttpDelete, DHttpPatch, DHttpOptions, DHttpHead };
