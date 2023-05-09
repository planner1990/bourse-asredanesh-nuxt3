import {defineStore} from "pinia";
import {OrderQueState} from "~/types/stores";

export const useOrderQue =
    defineStore("orderQue", () => {
        const state: OrderQueState = reactive({
            amount: 0,
            totalVolume: 0
        });
        const orderQueAmount = computed(() => state.amount);

        function showAmount(amount: number) {
            state.amount = amount;
        }

        function resetAmount() {
            state.amount = 0;
        }

        return {
            orderQueAmount,
            showAmount,
            resetAmount
        };
    });
