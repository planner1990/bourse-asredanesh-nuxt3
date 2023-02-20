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
  new WatchListColumns(i18n.t("instrument.title").toString(), "title"),
  new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
  new WatchListColumns(i18n.t("instrument.last").toString(), "last"),
  new WatchListColumns(i18n.t("instrument.end").toString(), "end"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count"),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
  new WatchListColumns(i18n.t("oms.value").toString(), "value")
];


async function getTradeHistories() {
  const data = {
    title: "صکوک مرابحه",
    name: "خگستر۲",
    last: "3,554",
    end: "3,554",
    count: "0",
    amount: "0",
    value: "0"
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
  @apply tw-bg-[#F8F8F8] tw-text-gray3 tw-font-medium tw-rounded-full;
}

:deep(.bar) {
  border-color: #E0E0E0;
}

:deep(.row-border td) {
  border-bottom: 1px solid #ffffff;
}

.table-container {
  border-radius: 12px
}
</style>
<template>
  <div class="tw-mx-2 tw-pt-3">
    <ada-data-table :items="entryAndExitHistoryList" :headers="defaultCols" item-key="dateTime"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.title="{ item }">
        <span>
           {{ item.title }}
        </span>
      </template>
      <template #item.name="{ item }">
        <span>
          {{ item.name }}
        </span>
      </template>
      <template #item.last="{ item }">
        <span>
          {{ item.last }} <span class="tw-text-gray5 tw-mx-3">|</span> 0
        </span>
      </template>
      <template #item.end="{ item }">
        <span>
          {{ item.end }} <span class="tw-text-gray5 tw-mx-3">|</span> 0
        </span>
      </template>
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
      <template #item.value="{ item }">
        <span>
          {{ item.value }}
        </span>
      </template>
    </ada-data-table>
  </div>
</template>