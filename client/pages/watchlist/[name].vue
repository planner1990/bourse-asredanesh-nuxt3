<script lang="ts" setup>
import { useUser, useWebSocket } from "~/composables";
import { InstrumentSearchModel } from "~/types";

definePageMeta({
  layout: "private-default",
});

const route = useRoute();
const userManager = useUser();
const loadingRef = ref(false);
const ws = useWebSocket();

const name = (route.params.name as string) ?? "new";

const showSearchModel = computed(() => {
  return new InstrumentSearchModel(userManager.watchList[route.params.name as string]?.map((item) => typeof item === "string" ? parseInt(item) : item) ?? [])
})

const edited = computed(
  () => {
    return Object.keys(userManager.settingsChanged).indexOf("/watch_lists/" + name) != -1
  }
);

async function reset() {
  userManager.resetSetting(`/watch_lists/${name}`);
}

async function apply() {
  loadingRef.value = true;
  const ids = [...showSearchModel.value.ids];
  try {
    await userManager.update_settings({
      path: "/watch_lists/" + name,
      value: ids.map((item) => item.toString()),
      deActiveChange: true,
    });
  } finally {
    loadingRef.value = false;
  }
}

defineExpose({
  reset,
  loadingRef,
  edited,
});

</script>

<style lang="postcss" scoped>

</style>

<template>
  <div class="tw-mx-auto">
    <div class="tw-grid tw-col-span-1">
      <dashboard-focus-board>
        <template #toolbar>
          <dashboard-watch-list-selector auto-route class="tw-mt-0 tw tw-max-w-[164px]" />
          <oms-instrument-search class="tw-mt-0 tw-mr-2 tw-max-w-[164px]" focus-result />
          <ada-btn dark v-if="edited" @click.stop.prevent="apply"
            class="tw-ml-1 tw-mr-2 tw-text-sm tw-bg-success tw-text-white tw-py-2 tw-px-3" :height="28" :width="56">
            {{ $t("general.apply") }}
          </ada-btn>
          <ada-btn dark v-if="edited" @click.stop="reset"
            class="tw-m-0 tw-mx-1 tw-text-sm tw-bg-error tw-text-white tw-py-2 tw-px-3" :height="28" :width="56">
            {{ $t("general.cancel") }}
          </ada-btn>
          <div v-if="edited" class="bar tw-mx-1 tw-static"></div>
        </template>
      </dashboard-focus-board>
    </div>
    <div class="tw-grid tw-scroll-p-1">
      <DashboardWatchList :searchModel="showSearchModel" />
    </div>
    <loading :loading="loadingRef" />
    <bottom-panel>
      <NuxtPage />
    </bottom-panel>
  </div>
</template>
