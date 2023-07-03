<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import {
  WatchListColumns,
  InstrumentCache,
  InstrumentSearchModel
} from "@/types";
import {useI18n} from "vue-i18n"

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();

const props = withDefaults(
    defineProps<{
      modelValue?: InstrumentSearchModel
    }>(),
    {
      modelValue: () => new InstrumentSearchModel()
    });
const emit = defineEmits(["update:modelValue"]);

const related = reactive<Array<InstrumentCache>>([]);
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.name").toString(), "name", "center", "80px"),
  new WatchListColumns(i18n.t("instrument.flow").toString(), "flow", "center", "80px"),
  new WatchListColumns(i18n.t("instrument.actions").toString(), "actions", "center", "80px"),
  new WatchListColumns(i18n.t("instrument.last").toString(), "last", "center", "20%"),
  new WatchListColumns(i18n.t("instrument.end").toString(), "end", "center", "20%"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count", "center", "10%"),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount", "center", "10%"),
  new WatchListColumns(i18n.t("oms.value").toString(), "value", "center", "15%")
];


async function getTradeHistories(inst: InstrumentCache | null) {
  bottomPanelManager.setLoading(true);
  related.splice(0, Infinity)
  if (inst) {
    related.push(Object.assign({}, inst, {flow: 2}))
    related.push(Object.assign({}, inst, {flow: 3}))
    related.push(Object.assign({}, inst, {flow: 4}))
  }
  bottomPanelManager.setLoading(false);
}

watch(() => instrumentManager.getSelected, (update) => {
  getTradeHistories(update);
})

getTradeHistories(instrumentManager.getSelected);

const canFocus = computed(() => {
  if (!process.client) return false;
  return (
      instrumentManager.getFocus.length <
      Math.floor(instrumentManager.width / 360)
  );
});

function focus(item: InstrumentCache, flow?: any) {
  // switch (flow) {
  //   case 2:
  //     item.id = +item.id + 1;
  //     break;
  //   case 3:
  //     item.id = +item.id + 2;
  //     break;
  //   case 4:
  //     item.id = +item.id + 3;
  //     break;
  // }
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
  instrumentManager.select(item)
}
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

.isAble {
  @apply tw-text-info;
}
</style>
<template>
  <div class="tw-mx-3 tw-pt-3">
    <ada-data-table :items="related" :headers="defaultCols" item-key="id" class="tw-w-full tw-h-full">
      <template #item.name="{ item }">
        <span>
          {{ item.name }}
        </span>
      </template>
      <template #item.flow="{ item }">
        <span>
          {{ $t("instrument.flows." + item.flow) }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <div class="text-no-wrap">
          <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-cursor-pointer" :size="16"
                    @click.stop.prevent="() => focus(item, item.flow)"
                    :class="[canFocus ? 'isAble' : 'isDisabled']" :disabled="!canFocus">
            isax-eye
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
