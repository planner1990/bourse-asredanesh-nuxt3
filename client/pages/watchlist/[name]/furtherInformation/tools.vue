<script setup lang="ts">
import {useBottomPanel, useInstrument, useOrder} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
  WatchListColumns,
  TradesHistorySerachModel, Side, InstrumentCache
} from "@/types";
import {useI18n} from "vue-i18n"
import {InstrumentSearchModel} from "@/types";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const orderManager = useOrder();
const route = useRoute();
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

const defaultCols = [
  new WatchListColumns(i18n.t("instrument.tools"), "type"),
  new WatchListColumns(i18n.t("instrument.actions"), "actions"),
  new WatchListColumns(i18n.t("instrument.name"), "name"),
  new WatchListColumns(i18n.t("instrument.tradeCount"), "totalTrades"),
  new WatchListColumns(i18n.t("instrument.tradeVol"), "totalShares"),
  new WatchListColumns(i18n.t("instrument.tradeVal"), "totalTradesValue"),
  new WatchListColumns(i18n.t("instrument.lowest"), "lowest"),
  new WatchListColumns(i18n.t("instrument.highest"), "highest"),
  new WatchListColumns(i18n.t("instrument.yesterdayPrice"), "yesterdayPrice"),
  new WatchListColumns(i18n.t("instrument.opening"), "opening"),
  new WatchListColumns(i18n.t("instrument.last"), "last"),
  new WatchListColumns(i18n.t("instrument.closing"), "closing"),
];

const instruments: Array<InstrumentCache> = reactive([])

async function getTradeHistories(inst: InstrumentCache, typeId?: string) {
  const data = typeId ? await instrumentManager.getInstrumentsDetail(new InstrumentSearchModel([], [], [], inst.company, inst.type)) :
      await instrumentManager.getInstrumentsDetail(new InstrumentSearchModel([], [], [], inst.company))
  instruments.splice(0, Infinity, ...data);
  bottomPanelManager.setLoading(false);
}

function order(item: InstrumentCache, side: Side) {
  orderManager.setSide(side, item.id.toString());
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
}

function focus(item: InstrumentCache) {
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
  instrumentManager.select(item)
}

const canFocus = computed(() => {
  if (!process.client) return false;
  return (
      instrumentManager.getFocus.length <
      Math.floor(instrumentManager.width / 360)
  );
});

watch(() => instrumentManager.getSelected, (update) => {
  if (update)
    getTradeHistories(update);
  else
    instruments.splice(0, Infinity)
})

watch(() => route.query, () => {
  if (typeof route.query.typeId === 'string' && instrumentManager.getSelected) {
    const typeId = route?.query.typeId;
    getTradeHistories(instrumentManager.getSelected, typeId);
  } else
    instruments.splice(0, Infinity)
})

if (instrumentManager.getSelected)
  getTradeHistories(instrumentManager.getSelected);
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
    <ada-data-table :items="instruments" :headers="defaultCols" item-key="instrumentId"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.type="{ item }">
        <span>
          {{ $t("instrument.types." + item.type) }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <div class="text-no-wrap tw-cursor-pointer">
          <ada-icon class="tw-m-0 tw-p-0 tw-mx-2" :class="[canFocus ? 'tw-text-info' : '']"
                    @click.stop.prevent="() => focus(item)" :disabled="!canFocus" :size="16">
            isax-eye
          </ada-icon>
          <ada-icon :class="[
            'tw-m-0 tw-p-0 tw-cursor-pointer',
            (item.status & 3) != 3 ? null : 'tw-text-success',
          ]" @click.stop.prevent="() => order(item, Side.Buy)" :disabled="(item.status & 3) != 3" :size="16">
            isax-bag-tick-2
          </ada-icon>
          <ada-icon :class="[
            'tw-m-0 tw-p-0 tw-mx-2 tw-cursor-pointer',
            (item.status & 3) != 3 ? null : 'tw-text-error',
          ]" @click.stop="() => order(item, Side.Sell)" :disabled="(item.status & 3) != 3" :size="16">
            isax-bag-cross-1
          </ada-icon>
        </div>
      </template>
      <template #item.wealth="{ item }">
        <numeric-field :value="item.amount"/>
      </template>
      <template #item.opening="{ item }">
        <numeric-field :value="item.opening"/>
      </template>
      <template #item.closing="{ item }">
        <numeric-field :value="item.closing"
                       :class="item.closing < item.yesterdayPrice ? 'tw-text-error' : 'tw-text-success'"/>
      </template>
      <template #item.last="{ item }">
        <numeric-field :value="item.last"
                       :class="item.last < item.yesterdayPrice ? 'tw-text-error' : 'tw-text-success'"/>
      </template>
      <template #item.yesterdayPrice="{ item }">
        <numeric-field :value="item.yesterdayPrice"/>
      </template>
      <template #item.lowest="{ item }">
        <numeric-field :value="item.lowest"/>
      </template>
      <template #item.highest="{ item }">
        <numeric-field :value="item.highest"/>
      </template>
      <template #item.totalTrades="{ item }">
        <numeric-field :value="item.totalTrades"/>
      </template>
      <template #item.totalShares="{ item }">
        <numeric-field :value="item.totalShares"/>
      </template>
      <template #item.totalTradesValue="{ item }">
        <numeric-field :value="item.totalTradesValue"/>
      </template>
      <template #item.status="{ item }">
        <span>
          {{ $t("instrument.state." + item.status) }}
        </span>
      </template>
    </ada-data-table>
  </div>
</template>