<script setup lang="ts">
import { useBottomPanel, useInstrument } from "~~/composables";
import DateTime from "@/components/date/time.vue";
import NumericField from "@/components/numericField.vue";
import { TradesHistory, WatchListColumns, PaginatedResult, TradesHistorySerachModel, DailyPrice, MarketHistory, InstrumentCache } from "@/types";
import { useI18n } from "vue-i18n"
import { mode } from "process";

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

const tradeHistories = reactive<Array<TradesHistory>>([]);
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.tradeDate").toString(), "dateTime"),
  new WatchListColumns(i18n.t("instrument.tradeCount").toString(), "totalTrades"),
  new WatchListColumns(i18n.t("instrument.totalShares").toString(), "totalShares"),
  new WatchListColumns(i18n.t("instrument.totalTradesValue").toString(), "totalTradeValue"),
];

const cols = computed(() => {
  const tmp = [...defaultCols];
  if (instrumentManager.state.selected)
    tmp.push(...[
      new WatchListColumns(i18n.t("instrument.opening").toString(), "opening"),
      new WatchListColumns(i18n.t("instrument.lowest").toString(), "lowest"),
      new WatchListColumns(i18n.t("instrument.highest").toString(), "highest"),
      new WatchListColumns(i18n.t("instrument.last").toString(), "lastPrice"),
      new WatchListColumns(i18n.t("instrument.closing").toString(), "closing"),
    ])
  return tmp;
});

async function getTradeHistories(inst: InstrumentCache | null) {
  bottomPanelManager.setLoading(true);
  let task: Promise<DailyPrice[]> | null = null;
  tradeHistories.splice(0, tradeHistories.length)
  if (inst != null) {
    task = getDailyPrices(inst);
    const { data } = await instrumentManager.getTradeHistories({
      id: inst.id,
      offset: 0,
      length: 10
    })
    const daily = await task;
    tradeHistories.push(...data.map((market) => {
      const ind = daily.findIndex((item) => item.dateTime == market.dateTime);
      return {
        ...market,
        ...(ind > -1 ? daily[ind] : {})
      }
    }));
  } else {
    const { data } = await instrumentManager.getTradeHistories({
      offset: 0,
      length: 10
    })
    tradeHistories.push(...data);
  }
  console.log(tradeHistories)
  bottomPanelManager.setLoading(false);

}
async function getDailyPrices(inst: InstrumentCache) {
  return await instrumentManager.getDailyPrices(inst.id, {
    offset: 0,
    length: 10
  })
}

watch(() => instrumentManager.getSelected, (update) => {
  getTradeHistories(update);
})

getTradeHistories(instrumentManager.getSelected);
</script>

<template>
  <ada-data-table :items="tradeHistories" :headers="cols" item-key="id" class="tw-w-full tw-h-full tw-overflow-y-auto">
    <template #item.totalTrades="{ item }">
      <NumericField :value="item.totalTrades" />
    </template>
    <template #item.totalShares="{ item }">
      <NumericField :value="item.totalShares" />
    </template>
    <template #item.totalTradeValue="{ item }">
      <NumericField :value="item.totalTradeValue" />
    </template>
    <template #item.dateTime="{ item }">
      <DateTime :value="item.dateTime" :format="$t('general.date.d')" class="ltr" />
    </template>
  </ada-data-table>
</template>
