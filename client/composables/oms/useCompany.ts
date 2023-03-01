import {defineStore} from "pinia";
import {decode} from "@msgpack/msgpack";
import {CompanyState} from "@/types/stores";

import {useAxios} from "..";
import {useWebSocket} from "~/composables";

export const useCompany = defineStore("company", () => {
    const state = ref<CompanyState>({
        cache: reactive({}),
        selected: null
    });
    const axiosManager = useAxios();
    const axios = axiosManager.createInstance();
    const websocket = useWebSocket();

    websocket.registerHandler("Company'sBoard", (data) => {
        const inst = state.value.cache[data.referenceNumber];
        const parsedData = data.obj ? (decode(data.obj) as any) : {};
        debugger;
        if (typeof inst != "undefined") {
            console.log(parsedData, "qqqqqqqqqqqqqqqqqq");
        }
    });


    return {
        state,
        // Getters
    };
});
