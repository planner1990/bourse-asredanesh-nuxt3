import {defineStore} from "pinia";
import {Order} from "~/types";

export const useDraft = defineStore("draft", () => {
    const draftCheckedBox = ref<Array<any>>([]);
    const orders = reactive<{ items: Order[] }>({items: []});
    const getDraftCheckBox = computed(() => draftCheckedBox);
    const getOrders = computed(() => orders);
    const resetGetOrders = ref<boolean>(false);
    const getOrderFlagAfterCallApi = computed(() => orders);

    function setDraftCheckbox(checkBoxDraftList: Array<any>) {
        if (checkBoxDraftList.length != 0) {
            draftCheckedBox.value = checkBoxDraftList;
        } else {
            draftCheckedBox.value = []
        }
    }

    function resetGetOrderAPi(flag: boolean) {
        resetGetOrders.value = flag;
    }

    return {
        draftCheckedBox,
        orders,
        getDraftCheckBox,
        getOrders,
        resetGetOrders,
        getOrderFlagAfterCallApi,
        setDraftCheckbox,
        resetGetOrderAPi
    };
});
