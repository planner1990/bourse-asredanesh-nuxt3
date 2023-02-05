import {defineStore} from "pinia";
import {useAxios} from "@/composables/useAxios";
import {getAccountingDetail, getMethods} from "@/repositories/accounting/payment";
import {PaymentMethod} from "~~/types";
import {useUser} from "~/composables";

export const usePayment = defineStore("payment", () => {
    const paymentMethodsCache = ref<Array<PaymentMethod>>([]);
    const accountDetailCache = ref<Array<any>>([]);
    const axios = useAxios().createInstance();
    const userName = useUser();
    const paymentMethods = computed(() => {
        if (paymentMethodsCache.value.length == 0) {
            getMethods(axios).then((res) => {
                paymentMethodsCache.value = res.data.data;
            });
        }
        return paymentMethodsCache.value;
    });

    const accountDetail = computed(() => {
        getAccountingDetail(axios).then((res) => {
            accountDetailCache.value = res.data.data;
        });
        return accountDetailCache.value;
    });

    return {
        paymentMethods,
        accountDetail
    };
});
