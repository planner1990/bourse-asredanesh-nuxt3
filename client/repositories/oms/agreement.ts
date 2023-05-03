import {AxiosInstance, AxiosResponse} from "axios";
import {AgreementList} from "@/types";


export async function getAgreementsList(
    axios: AxiosInstance
): Promise<AxiosResponse<AgreementList>> {
    return axios.get("oms/agreement");
}

export async function confirmAgreement(
    value: number, axios: AxiosInstance
): Promise<AxiosResponse<AgreementList>> {
    return axios.put('sso/user/confirm-agreement', {id: value})
}

export default {
    getAgreementsList,
    confirmAgreement
}
  