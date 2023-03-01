<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel, TabItem
} from "@/types";
import {useI18n} from "vue-i18n"
import {Agreements} from "~/types/oms/agreements";
import ExpansionTable from "~/components/ada/expansionTable.vue";

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

</script>

<template>
  <div class="tw-w-full">
    <expansion-table :cells="directorateList" :default-cols="defaultCols">
      <template #expansion-message>
        <td colspan="6">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده
          شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
          طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در
          ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
          پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

          <div class="tw-flex tw-justify-between tw-mt-5">
            <div class="tw-flex tw-text-primary tw-items-center">
              <div class="checkbox">
                <input type="checkbox" id="checkbox2" name="" value="">
                <label for="checkbox2"><span></span></label>
              </div>
              <div class="tw-mr-3 tw-font-semibold"><span v-text="$t('general.agreementsText')"></span></div>
            </div>
            <div>
              <ada-btn class="agreements-button">
                <ada-icon class="agreements-button_icon" :size="13">
                  isax-tick-circle
                </ada-icon>
                <span v-text="$t('general.ConfirmAgree')"></span>
              </ada-btn>
              <ada-btn
                  class="disagreement-button">
                <ada-icon :size="13" class="disagreement-button_icon">
                  isax-close-circle
                </ada-icon>
                <span v-text="$t('general.notAgree')"></span>
              </ada-btn>
            </div>
          </div>
        </td>
      </template>
    </expansion-table>
  </div>
</template>