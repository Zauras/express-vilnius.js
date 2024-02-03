import { Request, Response } from "express";

import { EHttpMethod } from "../utils";
import { HttpStatus } from "../utils/http-status";

type IApiServiceResponse = Promise<void | Response>;

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
  request: Request,
  response: Response,
  {
    getHandler,
    postHandler,
    putHandler,
    patchHandler,
    deleteHandler,
    headHandler
  }: IHttpMethodHandlersConfig
): Promise<Response | void | undefined> => {
  const { method } = request;

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
        return response.status(HttpStatus.ClientError.NOT_FOUND_404).end();
    }
  } catch (exception) {
    return response.status(HttpStatus.ServerError.INTERNAL_500).end();
  }
};

export type { IApiServiceResponse, IHttpMethodHandler, IHttpMethodHandlersConfig };
export { httpMethodSwitch };
