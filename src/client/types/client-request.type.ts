import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";

type IReqMethodReturnDto<TRespResult, TReqInput = undefined> = {
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  body?: TReqInput;
  responseFn?: (responseData: any) => Promise<TRespResult>;
};

type IReqMethodReturn<TRespResult, TReqInput = undefined> = Promise<
  IReqMethodReturnDto<TRespResult, TReqInput>
>;

export type { IReqMethodReturnDto, IReqMethodReturn };
