<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel, TabItem
} from "@/types";
import {useI18n} from "vue-i18n"
import {Agreements} from "~/types/oms/agreements";

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
let directorateList = reactive<Array<Agreements>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.row").toString(), "row"),
  new WatchListColumns(i18n.t("instrument.title").toString(), "title"),
  new WatchListColumns(i18n.t("instrument.zone").toString(), "zone"),
  new WatchListColumns(i18n.t("instrument.dateOfAgreement").toString(), "dateOfAgreement"),
  new WatchListColumns(i18n.t("instrument.expirationOfAgreement").toString(), "expirationOfAgreement"),
  new WatchListColumns(i18n.t("instrument.situationOfAgreement").toString(), "situationOfAgreement"),
  new WatchListColumns("", "actions", "center", "100px")
];


async function getTradeHistories() {
  directorateList = [{
    row: 1,
    title: "بيانيه ريسک معاملات بازار پايه",
    zone: "معامله در بازار (پایه فرابورس)",
    dateOfAgreement: "۱۴۰۰/۰۱/۱۰",
    expirationOfAgreement: "۱۴۰۰/۰۱/۱۰",
    situationOfAgreement: "تایید شده"
  },
    {
      row: 2,
      title: "بيانيه ريسک معاملات بازار پايه",
      zone: "معامله در بازار (پایه فرابورس)",
      dateOfAgreement: "۱۴۰۰/۰۱/۱۰",
      expirationOfAgreement: "۱۴۰۰/۰۱/۱۰",
      situationOfAgreement: "تایید شده"
    },
    {
      row: 3,
      title: "بيانيه ريسک معاملات بازار پايه",
      zone: "معامله در بازار (پایه فرابورس)",
      dateOfAgreement: "۱۴۰۰/۰۱/۱۰",
      expirationOfAgreement: "۱۴۰۰/۰۱/۱۰",
      situationOfAgreement: "تایید شده"
    },
    {
      row: 4,
      title: "بيانيه ريسک معاملات بازار پايه",
      zone: "معامله در بازار (پایه فرابورس)",
      dateOfAgreement: "۱۴۰۰/۰۱/۱۰",
      expirationOfAgreement: "۱۴۰۰/۰۱/۱۰",
      situationOfAgreement: "تایید شده"
    },
  ]
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
<style lang="postcss" scoped>

.agreements-header {
  @apply tw-bg-primary tw-bg-opacity-10;
  height: 32px;

  td {
    @apply tw-text-sm tw-font-semibold tw-text-[#757575];
  }

  td:nth-child(6) {
    border-left: none;
  }
}

.agreements-cells {
  td {
    @apply tw-h-9 tw-text-sm tw-text-gray2 tw-font-medium  ;
  }
}

.agreements-expansion {
  td {
    @apply tw-text-justify tw-px-12 tw-pt-3 tw-pb-9 tw-text-sm tw-text-gray2;
    width: 500px;
  }
}


.checkbox input[type="checkbox"] {
  width: auto;
  opacity: 0.00000001;
  position: absolute;
  left: 0;
  margin-left: -20px;
}

.checkbox label {
  position: relative;
}

.checkbox label:before {
  content: '';
  position: absolute;
  left: -9px;
  top: -6px;
  margin: 0 4px;
  width: 13px;
  height: 13px;
  transition: transform 0.28s ease;
  border-radius: 3px;
  border: 1px solid rgb(53, 84, 209);
}

.checkbox label:after {
  content: '';
  display: block;
  width: 10px;
  height: 5px;
  border-bottom: 2px solid rgb(53, 84, 209);
  border-left: 2px solid rgb(53, 84, 209);
  -webkit-transform: rotate(-45deg) scale(0);
  transform: rotate(-45deg) scale(0);
  transition: transform ease 0.25s;
  will-change: transform;
  position: absolute;
  top: -3px;
  left: -4px;
}

.checkbox input[type="checkbox"]:checked ~ label::before {
  color: #7bbe72;
}

.checkbox input[type="checkbox"]:checked ~ label::after {
  -webkit-transform: rotate(-45deg) scale(1);
  transform: rotate(-45deg) scale(1);
}

.checkbox input[type="checkbox"]:focus + label::before {
  outline: 0;
}

.agreements-button {
  width: 98px;
  height: 28px;
  background-color: rgba(0, 189, 121, 0.15);
  color: rgb(0, 189, 121);

  &_icon {
    margin-top: 1px;
    margin-left: 6px;
    color: rgb(0, 189, 121);
  }
}

.disagreement-button {
  width: 98px;
  height: 28px;
  background-color: rgba(239, 57, 78, 0.15);
  color: rgb(255, 59, 48);
  margin-right: 12px;

  &_icon {
    margin-top: 1px;
    margin-left: 6px;
    color: rgba(239, 57, 78, 1)
  }
}

</style>
<template>
  <div class="tw-w-full tw-p-4 tw-mt-2">
    <table class="tw-w-full tw-bg-[#f0f0f0] tw-text-center tw-rounded-lg">
      <tr class="agreements-header">
        <td v-for="header in defaultCols" class="tw-p-2">
          {{ header.text }}
        </td>
      </tr>
      <template v-for="cell in directorateList">
        <tr :class="{ opened: opened.includes(cell.row) }" class="agreements-cells"
            :style="{ 'border-bottom':  opened.includes(cell.row) ? '1px solid transparent' : '1px solid rgb(216, 216, 216)' }">
          <td>{{ cell.row }}</td>
          <td>{{ cell.title }}</td>
          <td>{{ cell.zone }}</td>
          <td>{{ cell.dateOfAgreement }}</td>
          <td>{{ cell.expirationOfAgreement }}</td>
          <td>{{ cell.situationOfAgreement }}</td>
          <td>
            <ada-icon
                class="tw-m-0 tw-p-0 tw-mx-2"
                :size="18"
                @click="toggle(cell.row)">
              mdi-{{ opened.includes(cell.row) ? 'chevron-up' : 'chevron-down' }}
            </ada-icon>
          </td>
        </tr>
        <tr v-if="opened.includes(cell.row)" class="agreements-expansion">
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
        </tr>
      </template>
    </table>
  </div>
</template>