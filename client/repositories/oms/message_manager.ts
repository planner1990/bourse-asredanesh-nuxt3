import {AxiosInstance, AxiosResponse} from "axios";
import {AutoCompleteItem, Message, MessageSourceResult, PaginatedResult} from "@/types";

export async function getMessage(
  id: number,
  axios: AxiosInstance
): Promise<AxiosResponse<Message>> {
  return await axios.get("oms/messages/" + id);
}

//TODO List Filter Type
export async function getMessageList(
  filters: object,
  axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<Message>>> {
  return await axios.post("oms/messages/list", filters);
}

export async function getMessageSource(
  instruments: Array<string>,
  axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<MessageSourceResult>>> {
  return await axios.get(
      "oms/messages/available-sources?ids=" + instruments
  );
}

export async function getMessageFilters(
  search: string,
  axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<AutoCompleteItem>>> {
  return await axios.get("oms/messages/filters?name=" + search);
}
