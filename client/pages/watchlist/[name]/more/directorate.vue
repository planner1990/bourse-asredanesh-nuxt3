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

<template>
  <ada-data-table :items="directorateList" :headers="defaultCols" item-key="dateTime"
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
</template>
