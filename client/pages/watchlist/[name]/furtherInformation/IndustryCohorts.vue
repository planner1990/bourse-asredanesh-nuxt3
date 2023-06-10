<script setup lang="ts">
import {useInstrument, useOrder} from "~~/composables";
import {
  WatchListColumns, SameSectorQuery, InstrumentSearchModel, InstrumentCache, Side
} from "@/types";
import {useI18n} from "vue-i18n"
import DateTime from "~/components/date/time.vue";

const i18n = useI18n();
const instrumentManager = useInstrument();
const orderManager = useOrder();
const instruments: Array<InstrumentCache> = reactive([]);
const props = withDefaults(
    defineProps<{
      modelValue?: SameSectorQuery
    }>(),
    {
      modelValue: () => ({
        instrument: 0,
        sector: 0
      })
    });
const emit = defineEmits(["update:modelValue"]);

const defaultCols = [
  new WatchListColumns(i18n.t("instrument.name").toString(), "name", "center", "80px"),
  new WatchListColumns(i18n.t("instrument.actions").toString(), "actions", "center", "80px"),
  new WatchListColumns(i18n.t("instrument.last").toString(), "last", "center", "20%"),
  new WatchListColumns(i18n.t("instrument.end").toString(), "end", "center", "20%"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count", "center", "10%"),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount", "center", "10%"),
  new WatchListColumns(i18n.t("oms.value").toString(), "value", "center", "15%")
];

watch(() => instrumentManager.getSelected, () => {
  const val = {
    instrument: instrumentManager.getSelected?.id || 0,
    sector: instrumentManager.getSelected?.sector || 0
  }
  emit("update:modelValue", val)
  getTeammateList(val)
})

async function getTeammateList(model: SameSectorQuery) {
  if (instrumentManager.getSelected) {
    await instrumentManager.getTeammates(model).then(async res => {
          if (res.data)
            await instrumentManager
                .getInstrumentsDetail(new InstrumentSearchModel(res.data)).then(res =>
                    instruments.splice(0, instruments.length, ...res)
                );
          else
            instruments.splice(0, instruments.length)
        }
    );
  }
}

function focus(item: InstrumentCache) {
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
  instrumentManager.select(item)
}

function order(item: InstrumentCache, side: Side) {
  orderManager.setSide(side, item.id.toString());
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
}

const canFocus = computed(() => {
  if (!process.client) return false;
  return (instrumentManager.getFocus.length <
      Math.floor(instrumentManager.width / 360)
  );
});

getTeammateList(props.modelValue)

</script>
<style lang="postcss" scoped>
:deep(.headers[data-v-8d846923]) {
  @apply tw-bg-stickyHeader tw-text-gray3 tw-font-medium tw-rounded-full;
  z-index: 9999;
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

.actions {
  i.icon {
    &.isax-eye {
      @apply tw-text-info;

      &:disabled {
        @apply tw-text-gray-500;
      }
    }
  }
}

.isDisabled {
  @apply tw-text-gray-500;
}

.isNotDisabled {
  @apply tw-text-info;
}
</style>
<template>
  <div class="tw-mx-3 tw-pt-3">
    <ada-data-table :items="instruments" :headers="defaultCols" item-key="id" class="tw-w-full tw-h-full">
      <template #item.name="{ item }">
                <span>
                    {{ item.name }}
                </span>
      </template>
      <template #item.actions="{ item }">
        <div class="text-no-wrap">
          <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-cursor-pointer" :size="16"
                    @click.stop.prevent="() => focus(item)" :class="[canFocus ? 'isNotDisabled' : 'isDisabled']"
                    :disabled="!canFocus">
            isax-eye
          </ada-icon>
          <ada-icon class="tw-m-0 tw-p-0 tw-ml-2 tw-text-success tw-cursor-pointer" :size="16"
                    @click.stop.prevent="() => order(item, Side.Buy)">
            isax-bag-tick-2
          </ada-icon>
          <ada-icon class="tw-m-0 tw-p-0 tw-text-error tw-cursor-pointer" :size="16"
                    @click.stop="() => order(item, Side.Sell)">
            isax-bag-cross-1
          </ada-icon>
        </div>
      </template>
      <template #item.last="{ item }">
                <span>
                    <numeric-field :value="item.last"></numeric-field>
                    <span class="tw-text-gray5 tw-mx-3">|</span>
                    <DateTime :value="item.lastModification" :format="$t('general.date.dt')" class="ltr"/>
                </span>
      </template>
      <template #item.end="{ item }">
                <span>
                    <numeric-field :value="item.closing"></numeric-field>
                    <span class="tw-text-gray5 tw-mx-3">|</span>
                    <DateTime :value="item.lastTradeDate" :format="$t('general.date.dt')" class="ltr"/>
                </span>
      </template>
      <template #item.count="{ item }">
        <numeric-field :value="item.totalTrades"></numeric-field>
      </template>
      <template #item.amount="{ item }">
        <numeric-field :value="item.totalShares"></numeric-field>
      </template>
      <template #item.value="{ item }">
        <numeric-field :value="item.totalTradesValue"></numeric-field>
      </template>
    </ada-data-table>
  </div>
</template>