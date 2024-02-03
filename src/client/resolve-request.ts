import { AxiosResponse, AxiosError, AxiosPromise } from "axios";

const parseResult = (response: AxiosResponse) => (response?.data ? response.data : response);

type IRespDto<TResultType> = {
  data: TResultType | null;
  error: AxiosError | {} | null;
};

type IRespResult<TResultType> = Promise<IRespDto<TResultType>>;

const resolveRequest = async <TResultType>(
  requestPromise: AxiosPromise
): IRespResult<TResultType> => {
  const result: IRespDto<TResultType> = { data: null, error: null };

  try {
    const response: AxiosResponse = await requestPromise;
    result.data = parseResult(response);
  } catch (error) {
    result.error = error as AxiosError;
  }

  return result;
};

export type { IRespDto, IRespResult };
export { resolveRequest };
