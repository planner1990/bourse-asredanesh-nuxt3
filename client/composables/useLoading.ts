import { defineStore } from "pinia";

export const useLoading = defineStore("loading", () => {
  let state = ref<boolean>(false);
  const loading = computed(() => state);
  function showLoading(loading: boolean) {
    state.value = loading;
  }

  return {
    loading,
    showLoading,
  };
});
