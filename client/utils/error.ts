import { AxiosError } from "axios";
import { Error } from "~/types";

export function ErrorExtractor(error: AxiosError): Error {
  if (error.response)
    return {
      code: error.response.status ?? 0,
      detail: (error.response.data as Error | null)?.detail ?? [],
    };
  else
    return {
      code: 0,
      detail: [],
    };
}
