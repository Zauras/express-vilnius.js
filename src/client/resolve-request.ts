import { AxiosResponse, AxiosError, AxiosPromise } from "axios";

const parseResult = (response: AxiosResponse) => (response?.data ? response.data : response);

type TRequestResult<ReturnType> = {
  data: ReturnType | null;
  error: AxiosError | {} | null;
};

type TAsyncRequestResult<ReturnType> = Promise<TRequestResult<ReturnType>>;

const resolveRequest = async <ReturnType>(
  requestPromise: AxiosPromise
): TAsyncRequestResult<ReturnType> => {
  const result: TRequestResult<ReturnType> = { data: null, error: null };

  try {
    const response: AxiosResponse = await requestPromise;
    result.data = parseResult(response);
  } catch (error) {
    result.error = error as AxiosError;
  }

  return result;
};

export type { TRequestResult, TAsyncRequestResult };
export { resolveRequest };
