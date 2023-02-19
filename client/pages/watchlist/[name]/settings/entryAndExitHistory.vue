<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
  WatchListColumns,
  TradesHistorySerachModel,
  entryAndExitHistory,
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
const entryAndExitHistoryList = reactive<Array<entryAndExitHistory>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.row").toString(), "row"),
  new WatchListColumns(i18n.t("instrument.ip").toString(), "ip"),
  new WatchListColumns(i18n.t("instrument.software").toString(), "software"),
  new WatchListColumns(i18n.t("instrument.actions").toString(), "actions"),
  new WatchListColumns(i18n.t("instrument.situation").toString(), "situation"),
  new WatchListColumns(i18n.t("instrument.date").toString(), "date")
];


async function getTradeHistories() {
  const data = {
    row: "1",
    ip: "185.168.12.21",
    software: "Silver",
    actions: "ورود",
    situation: "موفق",
    date: "موظف"
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

.table-container {
  border-radius: 12px
}
</style>
<template>
  <div class="tw-mx-2 tw-pt-3">
    <ada-data-table :items="entryAndExitHistoryList" :headers="defaultCols" item-key="dateTime"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.ip="{ item }">
        <span class="tw-text-info">
           {{ item.ip }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <span class="tw-text-success">
          {{ item.actions }}
        </span>
      </template>
      <template #item.situation="{ item }">
        <span class="tw-text-primary tw-font-medium">
          {{ item.situation }}
        </span>
      </template>
      <template #item.date="{ item }">
        <DateTime :format="$t('general.date.d')" class="ltr"/>
        | ۱۲:۵۴:۲۰
      </template>
    </ada-data-table>
  </div>
</template>