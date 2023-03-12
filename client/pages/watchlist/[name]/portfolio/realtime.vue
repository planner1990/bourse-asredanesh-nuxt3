<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"
import ExpansionTable from "~/components/ada/expansionTable.vue";
import RealTimeTable from "~/pages/watchlist/[name]/portfolio/realTimeTable.vue";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
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
  new WatchListColumns(i18n.t("instrument.row").toString(), "row"),
  new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
  new WatchListColumns(i18n.t("instrument.numberOfPurchases").toString(), "numberOfPurchases"),
  new WatchListColumns(i18n.t("instrument.totalPurchaseValue").toString(), "totalPurchaseValue"),
  new WatchListColumns(i18n.t("instrument.averagePrice").toString(), "averagePrice"),
  new WatchListColumns(i18n.t("instrument.headToHeadSellingPrice").toString(), "headToHeadSellingPrice"),
  new WatchListColumns(i18n.t("instrument.sharePrice").toString(), "sharePrice", "", ""),
  new WatchListColumns(i18n.t("instrument.netSalesValue").toString(), "netSalesValue"),
  new WatchListColumns(i18n.t("instrument.profitAndLossOfSale").toString(), "profitAndLossOfSale"),
  new WatchListColumns(i18n.t("instrument.profitAndLossBalance").toString(), "profitAndLossBalance"),
  new WatchListColumns(i18n.t("instrument.profitAndLossBalancePercent").toString(), "profitAndLossBalancePercent"),
  new WatchListColumns(i18n.t("instrument.profitAndLossOfTotal").toString(), "profitAndLossOfTotal"),
  new WatchListColumns(i18n.t("instrument.fromPortfolio").toString(), "fromPortfolio"),
  new WatchListColumns("", "actions", "center", "100px")
];


async function getTradeHistories() {
  for (let i = 0; i < 5; i++) {
    directorateList.push(
        {
          row: i + 1,
          name: "فرآور",
          numberOfPurchases: "۶۶۷.۶۳۵",
          totalPurchaseValue: "۲.۷۰۴.۴۲۵.۹۹۷",
          averagePrice: "۴.۰۵۱",
          headToHeadSellingPrice: "۴.۰۸۷",
          sharePrice: "۴.۲۶۴",
          netSalesValue: "۲.۸۲۵.۰۵۲.۶۳۷",
          profitAndLossOfSale: "۰",
          profitAndLossBalance: "۱۱۷.۳۱۷.۸۴۳",
          profitAndLossBalancePercent: "٪ ۴.۳۴",
          profitAndLossOfTotal: "۱۱۷.۳۱۷.۸۴۳",
          fromPortfolio: "۴۹.۴۷",
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

.radio-button input[type="radio"]:checked + label {
  @apply tw-text-primary tw-font-semibold;
}
</style>
<!--<template>-->
<!--  <div class="tw-mx-3 tw-pt-3">-->
<!--    <div class="tw-flex tw-justify-between tw-mb-2">-->
<!--      <div class="tw-mr-3 tw-flex tw-justify-center tw-items-center tw-text-gray3 radio-button">-->
<!--        <span>مبنای محاسبه ارزش فروش:</span>-->
<!--        <input type="radio" class="tw-mr-3" id="radio1" name="radios" checked>-->
<!--        <label class="radio tw-flex tw-mr-1" for="radio1">آخرین قیمت</label>-->
<!--        <input type="radio" class="tw-mr-5" id="radio2" name="radios">-->
<!--        <label class="radio tw-flex tw-mr-1" for="radio2">قیمت پایانی</label>-->
<!--      </div>-->
<!--      <div>-->
<!--        <ada-btn id="btn-edit"-->
<!--                 class="tw-ml-6 tw-bg-primary tw-text-white tw-min-w-[115px] tw-min-h-[24px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg">-->
<!--          <ada-icon :size="16" class="tw-text-white tw-ml-2">isax-add</ada-icon>-->
<!--          {{ $t("oms.addManual") }}-->
<!--        </ada-btn>-->
<!--      </div>-->
<!--    </div>-->
<!--    <ada-data-table-expansion :items="directorateList" :headers="defaultCols" item-key="dateTime"-->
<!--                              class="tw-w-full tw-h-full tw-overflow-y-auto">-->
<!--      <template #item.actions="{ item }">-->
<!--        <span>-->
<!--         <ada-icon-->
<!--             class="tw-m-0 tw-p-0 tw-mx-2"-->
<!--             :size="18"-->
<!--             @click="toggle(item.row)">-->
<!--          mdi-{{ opened.includes(item.row) ? 'chevron-up' : 'chevron-down' }}-->
<!--         </ada-icon>-->
<!--        </span>-->
<!--      </template>-->
<!--    </ada-data-table-expansion>-->
<!--  </div>-->
<!--</template>-->


<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-justify-between tw-mt-3">
      <div class="tw-mr-3 tw-flex tw-justify-center tw-items-center tw-text-gray3 radio-button">
        <span>مبنای محاسبه ارزش فروش:</span>
        <input type="radio" class="tw-mr-3" id="radio1" name="radios" checked>
        <label class="radio tw-flex tw-mr-1" for="radio1">آخرین قیمت</label>
        <input type="radio" class="tw-mr-5" id="radio2" name="radios">
        <label class="radio tw-flex tw-mr-1" for="radio2">قیمت پایانی</label>
      </div>
      <div>
        <ada-btn id="btn-edit"
                 class="tw-ml-6 tw-bg-primary tw-text-white tw-min-w-[115px] tw-min-h-[24px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg">
          <ada-icon :size="16" class="tw-text-white tw-ml-2">isax-add</ada-icon>
          {{ $t("oms.addManual") }}
        </ada-btn>
      </div>
    </div>
    <expansion-table :cells="directorateList" :default-cols="defaultCols">
      <template #expansion-message>
        <td colspan="14">
          <real-time-table></real-time-table>
        </td>
      </template>
    </expansion-table>
  </div>
</template>