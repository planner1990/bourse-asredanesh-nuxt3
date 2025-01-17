import {AxiosResponse, AxiosInstance} from "axios";
import {PaginatedResult, Side, Wealth, WealthSearchModel} from "@/types";

export async function getWealth(
    userName: string,
    value: WealthSearchModel,
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<Wealth>>> {
    return axios.get<PaginatedResult<Wealth>>(
        "/wealth-manager/" + userName + "/instruments/",
        {params: value}
    );
}

export async function getWage(
    id: string,
    side: Side,
    axios: AxiosInstance
): Promise<AxiosResponse<number>> {
    return axios.get<number>(
        "/wealth-manager/order/wage/" + id + "/" + (side == 1 ? "BUY" : "SELL")
    );
}

export async function getRestrictions(
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<Wealth>>> {
    return axios.get<PaginatedResult<Wealth>>(
        "/wealth-manager/restriction/active-list"
    );
}

export async function deleteOrdersByIds(
    value: any,
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<Wealth>>> {
    return axios.delete<PaginatedResult<Wealth>>(
        "/wealth-manager/order/" + value
    )
}

export async function sendOrdersByIds(
    value: any,
    axios: AxiosInstance
): Promise<AxiosResponse<PaginatedResult<Wealth>>> {
    return axios.put<PaginatedResult<Wealth>>(
        "/wealth-manager/order/execute_drafts/" + value
    )
}

export default {
    getWealth,
    getWage,
    getRestrictions,
    deleteOrdersByIds,
    sendOrdersByIds
};
