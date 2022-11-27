import {AxiosInstance, AxiosResponse} from "axios";
import {AutoCompleteItem, AutoCompleteSearchModel, PaginatedResult, PaymentMethod} from "@/types";

export async function getMethods(
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<PaymentMethod>>> {
    return axios.get("/accounting/payment/methods?offset=0&length=120");
}

export async function getAccountingDetail(
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<AutoCompleteItem>>> {
    return axios.get(`/accounting/detail`)
}

export default {
    getMethods,
    getAccountingDetail
}