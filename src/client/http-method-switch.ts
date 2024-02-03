import { IReqExpress, IRespExpress } from "#/common/types";
import { EHttpMethod } from "#/common/http-methods";
import { HttpStatus } from "#/common/http-status";

type IApiServiceResponse = Promise<void | IRespExpress>;

type IHttpMethodHandler = () => IApiServiceResponse;

type IHttpMethodHandlersConfig = {
  getHandler?: IHttpMethodHandler;
  postHandler?: IHttpMethodHandler;
  putHandler?: IHttpMethodHandler;
  patchHandler?: IHttpMethodHandler;
  deleteHandler?: IHttpMethodHandler;
  headHandler?: IHttpMethodHandler;
  optionsHandler?: IHttpMethodHandler;
};

const httpMethodSwitch = async (
  req: IReqExpress,
  resp: IRespExpress,
  {
    getHandler,
    postHandler,
    putHandler,
    patchHandler,
    deleteHandler,
    headHandler
  }: IHttpMethodHandlersConfig
): Promise<IRespExpress | void | undefined> => {
  const { method } = req;

  try {
    switch (method) {
      case EHttpMethod.Get:
        return await getHandler?.();

      case EHttpMethod.Post:
        return await postHandler?.();

      case EHttpMethod.Put:
        return await putHandler?.();

      case EHttpMethod.Patch:
        return await patchHandler?.();

      case EHttpMethod.Delete:
        return await deleteHandler?.();

      case EHttpMethod.Head:
        return await headHandler?.();

      case EHttpMethod.Options:
        return await headHandler?.();

      default:
        return resp.status(HttpStatus.ClientError.NOT_FOUND_404).end();
    }
  } catch (exception) {
    return resp.status(HttpStatus.ServerError.INTERNAL_500).end();
  }
};

export type { IApiServiceResponse, IHttpMethodHandler, IHttpMethodHandlersConfig };
export { httpMethodSwitch };
