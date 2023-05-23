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
let entryAndExitHistoryList = reactive<Array<any>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
  new WatchListColumns(i18n.t("oms.buy").toString(), "buy"),
  new WatchListColumns(i18n.t("oms.sell").toString(), "sell")
];


async function getTradeHistories() {
  entryAndExitHistoryList = [{
    amount: "حقیقی",
    buy: "60,797 M (99,7%)",
    sell: "60,373 M (99,0%)"
  },
    {
      amount: "حقوقی",
      buy: "130,865 M (0,2%)",
      sell: "554,890 M (0,9%)"
    },
    {
      amount: "تعداد",
      buy: "خرید",
      sell: "فروش"
    },
    {
      amount: "مجموع",
      buy: "1,000",
      sell: "871"
    },
    {
      amount: "حقیقی",
      buy: "999",
      sell: "868"
    },
    {
      amount: "حقوقی",
      buy: "1",
      sell: "3"
    },
  ]
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
    </ada-data-table>
  </div>
</template>