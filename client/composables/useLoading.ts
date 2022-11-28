import {defineStore} from "pinia";
import {Ref, ref} from "vue";

export const useLoading = defineStore("loading", () => {
    let state = ref<boolean>(false);


    const loading = computed(() => state)


    function showLoading(loading: boolean) {
        state.value = loading;
    }

    return {
        useLoading,
        loading,
        showLoading
    };
});
