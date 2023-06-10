<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
  WatchListColumns,
  TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();

const props = withDefaults(
    defineProps<{
      modelValue?: TradesHistorySerachModel
    }>(),
    {
      modelValue: () => ({
        offset: 0,
        length: 17,
      })
    });
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  }
})
const entryAndExitHistoryList = reactive<Array<any>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.holder").toString(), "holder"),
  new WatchListColumns(i18n.t("instrument.share").toString(), "share"),
  new WatchListColumns(i18n.t("instrument.percent").toString(), "percent"),
  new WatchListColumns(i18n.t("instrument.change").toString(), "change")
];


async function getTradeHistories() {
  const data = {
    holder: "شرکت ایران خودرو",
    share: "17 B",
    percent: "41,830",
    change: "0"
  }
  for (let i = 0; i <= 6; i++) {
    entryAndExitHistoryList.push(data);
  }
  bottomPanelManager.setLoading(false);
}

getTradeHistories();
</script>
<style lang="postcss" scoped>

:deep(.headers[data-v-8d846923]) {
  @apply tw-bg-primary tw-bg-opacity-10 tw-text-gray3 tw-font-medium tw-rounded-full;
}

:deep(.bar) {
  @apply tw-border-default;
}

:deep(tbody) {
  background-color: rgba(248, 248, 248, 1);
}

:deep(.row-border td) {
  border-bottom: 1px solid rgba(224, 224, 224, 1) !important;
}

.table-container {
  border-radius: 12px
}
</style>
<template>
  <div class="tw-mx-3 tw-pt-3">
    <ada-data-table :items="entryAndExitHistoryList" :headers="defaultCols"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.holder="{ item }">
        <span>
           {{ item.holder }}
        </span>
      </template>
      <template #item.share="{ item }">
        <span>
          {{ item.share }}
        </span>
      </template>
      <template #item.percent="{ item }">
        <span>
          {{ item.percent }}
        </span>
      </template>
      <template #item.change="{ item }">
        <span>
          {{ item.change }}
        </span>
      </template>
    </ada-data-table>
  </div>
</template>