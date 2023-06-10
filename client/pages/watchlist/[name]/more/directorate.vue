<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import NumericField from "@/components/numericField.vue";
import {
  WatchListColumns,
  TradesHistorySerachModel,
  DailyPrice,
  DirectorateList
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
const directorateList = reactive<Array<DirectorateList>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
  new WatchListColumns(i18n.t("instrument.memberName").toString(), "memberName"),
  new WatchListColumns(i18n.t("instrument.registrationNumber").toString(), "registrationNumber"),
  new WatchListColumns(i18n.t("instrument.representativeName").toString(), "representativeName"),
  new WatchListColumns(i18n.t("instrument.position").toString(), "position"),
  new WatchListColumns(i18n.t("instrument.nationalId").toString(), "nationalId"),
  new WatchListColumns(i18n.t("instrument.compulsory").toString(), "compulsory"),
  new WatchListColumns(i18n.t("instrument.degreeOfEducation").toString(), "degreeOfEducation")
];


async function getTradeHistories() {
  const data = {
    memberName: "گروه سرمایه گذاری سایپا",
    registrationNumber: "۱۴۰۰۱۲۱۱۲",
    representativeName: "حسین شهریاری",
    position: "۰۰۱۲۳۲۴۴۵",
    nationalId: "عضو هیئت مدیره",
    compulsory: "موظف",
    degreeOfEducation: "کارشناسی ارشد"
  }
  for (let i = 0; i <= 6; i++) {
    directorateList.push(data);
  }
  bottomPanelManager.setLoading(false);
}

getTradeHistories();
</script>
<style lang="postcss" scoped>
.header-directorate {
  @apply tw-h-8 tw-my-2 tw-bg-gray6 tw-py-2 tw-pb-7 tw-rounded-t-lg tw-pr-3 tw-text-sm tw-text-primary tw-font-semibold;
}

.detail-directorate {
  @apply tw-flex tw-h-11 tw-items-center tw-mb-2;

  .title-directorate {
    @apply tw-text-sm tw-text-primary tw-font-semibold tw-ml-1.5;
  }

  div:first-child {
    @apply tw-mr-5;
  }

  div:nth-child(2) {
    @apply tw-mx-28;
  }
}

:deep(.headers[data-v-8d846923]) {
  @apply tw-bg-[#FBFBFB] tw-text-gray3 tw-font-medium;
}

:deep(.bar) {
  @apply tw-border-default;
}
</style>
<template>
  <div class="tw-mx-2">
    <div class="header-directorate">اسامی اعضای هیئت مدیره</div>
    <ada-data-table :items="directorateList" :headers="defaultCols"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <template #item.totalTrades="{ item }">
        <NumericField :value="item.totalTrades"/>
      </template>
      <template #item.totalShares="{ item }">
        <NumericField :value="item.totalShares"/>
      </template>
      <template #item.totalTradeValue="{ item }">
        <NumericField :value="item.totalTradeValue"/>
      </template>
      <template #item.dateTime="{ item }">
        <DateTime :value="item.dateTime" :format="$t('general.date.d')" class="ltr"/>
      </template>
    </ada-data-table>
    <div class="header-directorate">مدیر عامل</div>
    <div class="detail-directorate">
      <div>
        <span class="title-directorate">نام مدیر عامل: </span>
        <span>حسین لطفی</span>
      </div>
      <div>
        <span class="title-directorate">کدملی: </span>
        <span>۰۰۱۲۲۱۲۳۴۵۴</span>
      </div>
      <div>
        <span class="title-directorate">مدرک تحصیلی: </span>
        <span>دکتری مدیریت کسب و کار</span>
      </div>
    </div>
  </div>
</template>
