import axios, { AxiosRequestConfig } from "axios";

import { IClientClass, IReqMethodReturnDto } from "#/client/types";
import { EHttpMethod } from "#/common/http-methods";

export function DRequest<TRespResult, TReqInput = undefined>(config: {
  method: EHttpMethod;
  uri: string;
}) {
  return function (_target: any, _propertyName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function ({ ...args }: any[]) {
      const url = `${(this as IClientClass["prototype"])?.baseUri || ""}${config.uri || ""}`;

      // Step 1: Call the original (parent) method to get the inner function
      // Assume the original method prepares and returns { requestData, headers, innerFunction }
      const { body, headers, responseFn }: IReqMethodReturnDto<TReqInput, TRespResult> =
        (await originalMethod.apply(this, args)) || {};

      // Step 2: Perform the Axios HTTP request
      const axiosConfig: AxiosRequestConfig = {
        method: config.method,
        url
      };
      if (body) axiosConfig.data = body as unknown as TReqInput;
      if (headers) axiosConfig.headers = headers;

      try {
        const response = await axios(axiosConfig);
        const isResponseFnProvided = responseFn && typeof responseFn === "function";
        // Step 3: Execute the inner function with the Axios response data
        // Step 3: Return response data if response aggregation fn not provided
        return <TRespResult>(
          (isResponseFnProvided ? await responseFn(response.data) : response.data)
        );
      } catch (error) {
        console.error(
          `Error in AsyncProcess decorator during ${config.method} request to ${config.uri}:`,
          error
        );
        throw error;
      }
    };
  };
}
