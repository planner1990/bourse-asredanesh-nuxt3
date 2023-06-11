<script setup lang="ts">
import { useBottomPanel, useInstrument } from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
  WatchListColumns,
  InstrumentSearchModel
} from "@/types";
import { useI18n } from "vue-i18n"

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();

const props = withDefaults(
  defineProps<{
    modelValue?: InstrumentSearchModel
  }>(),
  {
    modelValue: () => new InstrumentSearchModel()
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

const legalReal = computed(() => instrumentManager.getClientDistribution(instrumentManager.getSelected?.id || 0))

const defaultCols = [
  new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
  new WatchListColumns(i18n.t("oms.buy").toString(), "buy"),
  new WatchListColumns(i18n.t("oms.sell").toString(), "sell")
];

</script>
<style lang="postcss" scoped>
.container {
  @apply tw-p-3;
}

.ada-table {
  @apply tw-w-full tw-table-fixed;
  border: 0;

  thead {
    @apply tw-bg-primary tw-bg-opacity-10 tw-text-gray3 tw-font-medium;

    th {
      @apply tw-h-[32px] tw-text-center tw-relative;
    }
  }

  tbody {
    background-color: rgba(248, 248, 248, 1);

    tr {
      td {
        @apply tw-h-[32px] tw-text-center;
        border-bottom: 1px solid rgba(224, 224, 224, 1) !important;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <table class="ada-table">
      <thead>
        <th>{{ $t("general.type") }}
          <div class="bar"></div>
        </th>
        <th>{{ $t("oms.amount") }}
          <div class="bar"></div>
        </th>
        <th>{{ $t("oms.buy") }}
          <div class="bar"></div>
        </th>
        <th>{{ $t("oms.sell") }}
          <div class="bar"></div>
        </th>
        <th>{{ $t("oms.amount") }}
        </th>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t("user.personality.legal") }}</td>
          <td>
            <NumericField :value="legalReal.legal.buy.count"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.legal.buy.amount"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.legal.sell.amount"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.legal.sell.count"></NumericField>
          </td>
        </tr>
        <tr>
          <td>{{ $t("user.personality.real") }}</td>
          <td>
            <NumericField :value="legalReal.real.buy.count"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.real.buy.amount"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.real.sell.amount"></NumericField>
          </td>
          <td>
            <NumericField :value="legalReal.real.sell.count"></NumericField>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>