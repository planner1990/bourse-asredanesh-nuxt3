<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel, TabItem
} from "@/types";
import {useI18n} from "vue-i18n"
import {Agreements} from "~/types/oms/agreements";
import {Ref, ref} from "vue";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const expansionPanelFlag = ref<boolean>(false);
const currentId = ref(null);

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

function openExpansionPanel(item: any) {
  console.log(item.row)
  if (item && item.row === currentId.value) {
    expansionPanelFlag.value = !expansionPanelFlag.value;
  } else {
    expansionPanelFlag.value = true;
    currentId.value = item.row
  }
}

// function openSubMenu(item: TabItem) {
//   if (item && item.id === currentId.value) {
//     expansionPanelFlag.value = !expansionPanelFlag.value;
//   } else {
//     expansionPanelFlag.value = true;
//     currentId.value = item.id
//   }
// }
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
  border-color: #E0E0E0;
}

</style>
<template>
  <div class="tw-mx-2">
    <ada-data-table :items="directorateList" :headers="defaultCols" item-key="dateTime"
                    class="tw-w-full tw-h-full tw-overflow-y-auto">
      <!--      <template #item.totalTrades="{ item }">-->
      <!--        <NumericField :value="item.totalTrades"/>-->
      <!--      </template>-->
      <!--      <template #item.totalShares="{ item }">-->
      <!--        <NumericField :value="item.totalShares"/>-->
      <!--      </template>-->
      <!--      <template #item.totalTradeValue="{ item }">-->
      <!--        <NumericField :value="item.totalTradeValue"/>-->
      <!--      </template>-->
      <!--      <template #item.dateTime="{ item }">-->
      <!--        <DateTime :value="item.dateTime" :format="$t('general.date.d')" class="ltr"/>-->
      <!--      </template>-->
      <template #item.actions="{ item }">
        <div class="text-no-wrap">
          <ada-icon
              class="tw-m-0 tw-p-0 tw-mx-2"
              :size="18"
              @click="openExpansionPanel(item)"
          >
            mdi-{{ expansionPanelFlag === true && currentId === item.row ? 'chevron-up' : 'chevron-down' }}
          </ada-icon>
        </div>
      </template>
    </ada-data-table>
  </div>
</template>