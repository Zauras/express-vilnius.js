import { CookieOptions } from "express";

type IControllerRespDto<TRespData> = {
  data?: TRespData;
  headers?: { [key: string]: string };
  cookies?: { name: string; value: string; options?: CookieOptions }[];
  status?: number;
};

type IControllerResp<TRespData> = Promise<IControllerRespDto<TRespData> | undefined>;

export type { IControllerResp, IControllerRespDto };
