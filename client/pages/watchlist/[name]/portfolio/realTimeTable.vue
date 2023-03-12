<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";

import {
  WatchListColumns,
  TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"
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
  new WatchListColumns(i18n.t("instrument.date").toString(), "date"),
  new WatchListColumns(i18n.t("instrument.typeOfTransaction").toString(), "typeOfTransaction"),
  new WatchListColumns(i18n.t("oms.count").toString(), "count"),
  new WatchListColumns(i18n.t("oms.price").toString(), "price"),
  new WatchListColumns(i18n.t("instrument.totalPurchase").toString(), "totalPurchase"),
  new WatchListColumns(i18n.t("instrument.totalSell").toString(), "totalSell", "", ""),
  new WatchListColumns(i18n.t("instrument.remainingNumber").toString(), "remainingNumber"),
  new WatchListColumns(i18n.t("instrument.average").toString(), "average"),
  new WatchListColumns(i18n.t("instrument.remainTotal").toString(), "remainTotal"),
  new WatchListColumns(i18n.t("instrument.sellFinished").toString(), "sellFinished"),
  new WatchListColumns(i18n.t("instrument.profitAndLossSold").toString(), "profitAndLossSold"),
  new WatchListColumns(i18n.t("instrument.description").toString(), "description"),
  new WatchListColumns(i18n.t("instrument.mainDetail").toString(), "")
];


async function getTradeHistories() {
  for (let i = 0; i < 5; i++) {
    directorateList.push(
        {
          date: "1401/09/20",
          typeOfTransaction: "خرید",
          count: "۲۵۲.۲۰۹",
          price: "۲.۹۷۵",
          totalPurchase: "۱.۰۰۲.۵۳۰.۷۷۵",
          totalSell: "۰",
          remainingNumber: "۲۵۲.۲۰۹",
          average: "۳.۹۷۵",
          remainTotal: "۱.۰۰۲.۵۳۰.۷۷۵",
          sellFinished: "۰",
          profitAndLossSold: "۰",
          description: "تجمیع شده"
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
.agreements-header {
  @apply tw-bg-primary tw-bg-opacity-20;
  height: 32px !important;

  td {
    @apply tw-text-[#4C4C4C];
    font-size: 9px !important;
    text-align: center !important;
    position: relative;

    .border-header {
      border-left: 1px solid rgba(53, 84, 209, 0.4);
      position: absolute;
      left: 0;
      width: 10px;
      height: 16px;
    }
  }

  td:nth-child(6) {
    border-left: none;
  }

  td:first-child {
    border-radius: 0 8px 0 0;
  }

  td:last-child {
    border-radius: 8px 0 0 0;
  }
}

.agreements-cells {
  td {
    @apply tw-h-9 tw-text-sm tw-text-gray2 tw-font-medium tw-h-[32px];
  }
}

.agreements-expansion {
  td {
    @apply tw-px-0 tw-text-center tw-pt-0 tw-pb-0 tw-text-sm tw-text-gray2;
    width: 500px;
  }
}

.custom-checkbox {
  input {
    width: 10px;
    height: 10px;
    margin-top: 7px;
  }
}
</style>


<template>
  <div>
    <table class="tw-text-center">
      <tr class="agreements-header">
        <td class="custom-checkbox tw-mt-1"><input type="checkbox" value="Bike"></td>
        <td v-for="header in defaultCols" class="tw-p-2">
          {{ header.text }} <span class="border-header"></span>
        </td>
      </tr>
      <template v-for="cell in directorateList">
        <tr :class="{ opened: opened.includes(cell.row) }" class="agreements-cells tw-bg-grayF8"
            :style="{ 'border-bottom':  opened.includes(cell.row) ? '1px solid transparent' : '1px solid rgba(216,216,216,0.6)' }">
          <td class="custom-checkbox"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></td>
          <td v-for="item in cell">{{ item }}</td>
          <td>
            <ada-icon
                class="tw-m-0 tw-p-0 tw-mx-2 tw-text-primary"
                :size="14">
              isax-clipboard-text
            </ada-icon>
          </td>
        </tr>
        <tr v-if="opened.includes(cell.row)" class="agreements-expansion">
          <slot name="expansion-message">
          </slot>
        </tr>
      </template>
    </table>
  </div>
</template>