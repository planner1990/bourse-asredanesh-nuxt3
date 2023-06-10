<script setup lang="ts">
import {useFurtherInformation, useInstrument} from "~~/composables";
import {
  WatchListColumns,
  TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"

const i18n = useI18n();
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
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("oms.count").toString(), "count", 'center', '16.5%'),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount", 'center', '16.5%'),
  new WatchListColumns(i18n.t("oms.buy").toString(), "buy", 'center', '16.5%'),
  new WatchListColumns(i18n.t("oms.sell").toString(), "sell", 'center', '16.5%'),
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount2", 'center', '16.5%'),
  new WatchListColumns(i18n.t("oms.count").toString(), "count2", 'center', '16.5%')
];

const queue = computed(() => instrumentManager.getSelected ? instrumentManager.getOrderQueue(instrumentManager.getSelected) : []);
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
    <ada-data-table :items="queue" :headers="defaultCols"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.buy="{ item }">
        <numeric-field :value="item.buy.price"></numeric-field>
      </template>
      <template #item.count="{ item }">
        <numeric-field :value="item.buy.count"></numeric-field>
      </template>
      <template #item.amount="{ item }">
        <numeric-field :value="item.buy.amount"></numeric-field>
      </template>
      <template #item.amount2="{ item }">
        <numeric-field :value="item.sell.amount"></numeric-field>
      </template>
      <template #item.count2="{ item }">
        <numeric-field :value="item.sell.count"></numeric-field>
      </template>
      <template #item.sell="{ item }">
        <numeric-field :value="item.sell.price"></numeric-field>
      </template>
    </ada-data-table>
  </div>
</template>