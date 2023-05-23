import {defineStore} from "pinia";

export const useStockIndex =
    defineStore("stockIndex", () => {
        const state: any = reactive({
            dataFromTSETMC: [
                {
                    index: "زراعت",
                    last: "393,682.91",
                    change: "2955.85",
                    percent: "1.75",
                    maximum: "396,117.32",
                    minimum: "391,403.61"
                },
                {
                    index: "ذغال سنگ",
                    last: "71,648.69",
                    change: "2057.26",
                    percent: "2.96",
                    maximum: "71,601.72",
                    minimum: "69,335.95"
                },
                {
                    index: "كانه فلزي",
                    last: "627,945.34",
                    change: "3200.57",
                    percent: "0.51",
                    maximum: "627,889.03",
                    minimum: "627,120.18"
                },
            ]
        });
        const stockIndexData = computed(() => state.dataFromTSETMC);

        return {
            stockIndexData,
        };
    });
