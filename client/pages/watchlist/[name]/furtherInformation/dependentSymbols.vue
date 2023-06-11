<script setup lang="ts">
import { useBottomPanel, useInstrument } from "~~/composables";
import {
  WatchListColumns,
  InstrumentCache,
  InstrumentSearchModel
} from "@/types";
import { useI18n } from "vue-i18n"

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
    related.push(Object.assign({}, inst, { flow: 2 }))
    related.push(Object.assign({}, inst, { flow: 3 }))
    related.push(Object.assign({}, inst, { flow: 4 }))
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
function focus(item: InstrumentCache) {
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
  instrumentManager.select(item)
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
    <ada-data-table :items="related" :headers="defaultCols"
      class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.title="{ item }">
        <span>
          {{ item.title }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <div class="text-no-wrap">
          <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-text-info tw-cursor-pointer" @click="() => focus(item)" :size="16">
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