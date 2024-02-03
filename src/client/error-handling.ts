import { AxiosError } from "axios";

const COMMON_FORM_ERROR: string =
  "Something went wrong. Please try again later or contact our support.";

const getErrorStatus = (error: AxiosError): number | null => {
  if (!error) {
    return null;
  }
  return error.response?.status ?? 400;
};

export { getErrorStatus, COMMON_FORM_ERROR };
