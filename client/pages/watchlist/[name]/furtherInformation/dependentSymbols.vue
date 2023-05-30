<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
  WatchListColumns,
  TradesHistorySerachModel, Side, InstrumentCache
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
  new WatchListColumns(i18n.t("instrument.actions").toString(), "actions"),
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

function focus() {
  const item = {
    id: 919,
    code: "BDAN1",
    name: "دانا",
    fullName: "بيمه دانا",
    sector: 680,
    categoryName: "",
    baseVol: 4851543,
    tradeVal: 0,
    settlementDelay: 3,
    maxAllowedPrice: 0,
    minAllowedPrice: 0,
    namedPrice: 0,
    buyPrice: 0,
    sellPrice: 0,
    shares: 4000000000,
    companyName: "",
    maxQuantityPerOrder: 100000,
    minQuantityPerOrder: 1,
    issuePrice: 0,
    firstTradeDate: "2010-08-10T20:30:00.000+00:00",
    lastTradeDate: "12:30:01",
    expirationDate: "12:30:01",
    lastModification: "2020-06-12T20:30:00.000+00:00",
    status: 7,
    instrumentCode: "IRO1BDAN0001",
    instrumentId: 919,
    dateTime: "2020-06-14T20:30:00.000+00:00",
    opening: 4456,
    closing: 4372,
    highest: 4580,
    lowest: 4250,
    priceChange: 370,
    yesterdayPrice: 4353,
    totalShares: 117197115,
    totalTrades: 6665,
    totalTradesValue: 512332551609,
    amount: 0,
    last: 4284,
    notifications: [],
    latinFullName: "Dana Insurance",
    market: 1,
    board: 5,
    type: 300,
    category: 2,
    group: 25,
    priceType: "TEST1",
    priceRate: 10,
    quantityRate: 1,
    company: 19700455,
    segment: 1,
    flags: 1,
    lastPrice: "null",
    mdsboard: 21
  }
  instrumentManager.activateTab(item);
  instrumentManager.addFocus(item, 'hidden');
}
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
      <template #item.title="{ item }">
        <span>
           {{ item.title }}
        </span>
      </template>
      <template #item.actions>
        <div class="text-no-wrap">
          <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-text-info tw-cursor-pointer"
                    @click="focus" :size="16">
            isax-eye
          </ada-icon>
        </div>
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