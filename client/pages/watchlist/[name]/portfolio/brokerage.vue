<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"
import ExpansionTable from "~/components/ada/expansionTable.vue";
import {style} from "postcss-minify-font-values/types/lib/keywords";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const componentClass = ref<string>("");
let opened = reactive<Array<any>>([]);

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
let directorateList = reactive<Array<any>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.companyName").toString(), "companyName"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count"),
  new WatchListColumns(i18n.t("instrument.numberOfShares").toString(), "numberOfShares"),
  new WatchListColumns(i18n.t("instrument.lastUpdates").toString(), "lastUpdates"),
  new WatchListColumns(i18n.t("instrument.priceOfShares").toString(), "priceOfShares"),
  new WatchListColumns(i18n.t("instrument.valueOfShares").toString(), "valueOfShares"),
  new WatchListColumns(i18n.t("instrument.assemblies").toString(), "assemblies", "center"),
];


async function getTradeHistories() {
  for (let i = 0; i < 5; i++) {
    directorateList.push(
        {
          row: i + 1,
          companyName: "فرآور",
          count: "۶۶۷.۶۳۵",
          numberOfShares: "۲.۷۰۴.۴۲۵.۹۹۷",
          lastUpdates: "۴.۰۵۱",
          priceOfShares: "۴.۰۸۷",
          valueOfShares: "۴.۲۶۴",
        }
    );
  }
  bottomPanelManager.setLoading(false);
}

getTradeHistories();

function toggle(id: any) {
  const index = opened.indexOf(id);
  if (index > -1) {
    opened.splice(index, 1)
  } else {
    opened.push(id)
  }
}

</script>
<style scoped lang="postcss">
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

.img-icon {
  display: unset;
}

.radio-button input[type="radio"]:checked + label {
  @apply tw-text-primary tw-font-semibold;
}


</style>
<template>
  <div class="tw-mx-3 tw-pt-[14px]">
    <div class="tw-mr-3 tw-mb-[15px] tw-flex tw-text-gray3 radio-button">
      <span>مبنای محاسبه ارزش فروش:</span>
      <input type="radio" class="tw-mr-3" id="radio1" name="radios" checked>
      <label class="radio tw-flex tw-mr-1" for="radio1">آخرین قیمت</label>
      <input type="radio" class="tw-mr-5" id="radio2" name="radios">
      <label class="radio tw-flex tw-mr-1" for="radio2">قیمت پایانی</label>
    </div>
    <ada-data-table-expansion :items="directorateList" :headers="defaultCols" item-key="dateTime"
                              class="tw-w-full tw-h-full tw-overflow-y-auto">
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
      <template #item.amount2="{ item }">
        <span>
          {{ item.amount2 }}
        </span>
      </template>
      <template #item.count2="{ item }">
        <span>
          {{ item.count2 }}
        </span>
      </template>
      <template #item.assemblies="{ item }">
        <img class="img-icon" src="@/assets/images/search-normal.png" alt="">
      </template>
    </ada-data-table-expansion>
  </div>
</template>
