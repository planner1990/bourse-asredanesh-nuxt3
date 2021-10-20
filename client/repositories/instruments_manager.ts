import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse } from "axios"
import { PaginatedResult, AutoCompleteItem, Instrument, OrderQueueItem } from "@/types";

async function getInstrumentsDetail(instruments: Array<string | number>, axios: NuxtAxiosInstance): Promise<AxiosResponse<PaginatedResult<Instrument>>> {
  return axios.get('oms/instruments/daily-detail?ids=' + instruments + "&offset=0&length=" + instruments.length)
}

async function autoComplete(value: string, axios: NuxtAxiosInstance): Promise<AxiosResponse<PaginatedResult<AutoCompleteItem>>> {
  return axios.get('oms/instruments/name-autocomplete?name=' + value)
}

async function getOrderQueue(value: number, axios: NuxtAxiosInstance): Promise<AxiosResponse<OrderQueueItem[]>> {
  return axios.get('oms/instruments/order-queue/' + value)
}

async function getTeammates(instrumentId: number, axios: NuxtAxiosInstance) {
  return axios.get('oms/instruments/teammates/' + instrumentId)
}

export {
  getTeammates,
  getInstrumentsDetail,
  autoComplete,
  getOrderQueue
}
