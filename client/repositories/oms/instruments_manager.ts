import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse } from "axios"
import { PaginatedResult, AutoCompleteItem, InstrumentCache, OrderQueueItem, MarketHistory, Instrument, DailyPrice, ClientDistribution, ClientDistributionResponse, AutoCompleteSearchModel } from "@/types";

export async function getInstrumentsDetail(instruments: Array<string | number>, axios: NuxtAxiosInstance): Promise<AxiosResponse<PaginatedResult<Instrument & DailyPrice>>> {
  return axios.get('oms/instruments/daily-detail?ids=' + instruments + "&offset=0&length=" + instruments.length)
}

export async function getInstrumentMarketHistory(instruments: Array<string | number>, axios: NuxtAxiosInstance): Promise<AxiosResponse<PaginatedResult<MarketHistory>>> {
  return axios.get('oms/instruments/market-history?ids=' + instruments + "&offset=0&length=" + instruments.length)
}

export async function autoComplete(value: AutoCompleteSearchModel, axios: NuxtAxiosInstance): Promise<AxiosResponse<PaginatedResult<AutoCompleteItem>>> {
  return axios.get('oms/instruments/name-autocomplete', { params: value })
}

export async function getOrderQueue(value: number, axios: NuxtAxiosInstance): Promise<AxiosResponse<OrderQueueItem[]>> {
  return axios.get('oms/instruments/order-queue/' + value)
}

export async function getClientDistribution(value: number, axios: NuxtAxiosInstance): Promise<AxiosResponse<ClientDistributionResponse>> {
  return axios.get('oms/instruments/clients-distribution/' + value)
}

export async function getTeammates(instrumentId: number, sectorId: number, axios: NuxtAxiosInstance) {
  return axios.get('oms/instruments/same-sub-sectors/' + instrumentId + "/" + sectorId)
}