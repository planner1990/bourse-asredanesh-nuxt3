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
  new WatchListColumns(i18n.t("oms.count").toString(), "count"),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
  new WatchListColumns(i18n.t("oms.buy").toString(), "buy"),
  new WatchListColumns(i18n.t("oms.sell").toString(), "sell"),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count")
];


async function getTradeHistories() {
  const data = {
    count: "3",
    amount: "63,342",
    buy: "3,769",
    sell: "3,770",
    amount2: "64,535",
    count2: "4"
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
    <ada-data-table :items="entryAndExitHistoryList" :headers="defaultCols" item-key="dateTime"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.count="{ item }">
        <span>
           {{ item.count }}
        </span>
      </template>
      <template #item.amount="{ item }">
        <span>
          {{ item.amount }}
        </span>
      </template>
      <template #item.buy="{ item }">
        <span>
          {{ item.buy }}
        </span>
      </template>
      <template #item.sell="{ item }">
        <span>
          {{ item.sell }}
        </span>
      </template>
      <template #item.amount2="{ item }">
        <span>
          {{ item.amount2 }}
        </span>
      </template>
      <template #item.count2="{ item }">
        <span>
          {{ item.count2 }}
        </span>
      </template>
    </ada-data-table>
  </div>
</template>