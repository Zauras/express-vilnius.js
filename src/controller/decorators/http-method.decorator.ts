import { IControllerRespDto } from "#/controller/types";
import { EHttpMethod } from "#/common/http-methods";
import { IReqExpress, IRespExpress } from "#/common/types";

function createHttpDecorator<TRespData>(method: EHttpMethod): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
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
}

const DGet = createHttpDecorator(EHttpMethod.Get);
const DPost = createHttpDecorator(EHttpMethod.Post);
const DPut = createHttpDecorator(EHttpMethod.Put);
const DDelete = createHttpDecorator(EHttpMethod.Delete);
const DPatch = createHttpDecorator(EHttpMethod.Patch);
const DOptions = createHttpDecorator(EHttpMethod.Options);
const DHead = createHttpDecorator(EHttpMethod.Head);

export { DGet, DPost, DPut, DDelete, DPatch, DOptions, DHead };
