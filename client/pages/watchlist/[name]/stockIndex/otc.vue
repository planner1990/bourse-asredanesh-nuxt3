<script setup lang="ts">
import {useBottomPanel, useInstrument, useStockIndex} from "~/composables";
import {
    WatchListColumns,
    TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const StockIndexMockData = useStockIndex();
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
const inst = instrumentManager.getSelected;
const defaultCols = [
    new WatchListColumns(i18n.t("instrument.index").toString(), "index"),
    new WatchListColumns(i18n.t("instrument.last").toString(), "last"),
    new WatchListColumns(i18n.t("instrument.change").toString(), "change"),
    new WatchListColumns(i18n.t("instrument.percent").toString(), "percent"),
    new WatchListColumns(i18n.t("instrument.maximum").toString(), "maximum"),
    new WatchListColumns(i18n.t("instrument.minimum").toString(), "minimum")
];
</script>
<style lang="postcss" scoped>

:deep(.headers[data-v-8d846923]) {
    @apply tw-bg-primary tw-bg-opacity-10 tw-text-gray3 tw-font-medium tw-rounded-full;
}

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
</style>
<template>
    <div class="tw-mx-3 tw-pt-3">
        <ada-data-table :items="StockIndexMockData.stockIndexData" :headers="defaultCols" item-key="index"
                        class="tw-w-full tw-h-full tw-overflow-y-auto">
            <template #item.index="{ item }">
        <span>
          {{ item.index }}
        </span>
            </template>
            <template #item.last="{ item }">
        <span>
          {{ item.last }} <span class="tw-text-gray5 tw-mx-3">|</span> 10:00
        </span>
            </template>
            <template #item.change="{ item }">
        <span>
          {{ item.change }} <span class="tw-text-gray5 tw-mx-3"></span>
        </span>
            </template>
            <template #item.percent="{ item }">
        <span>
          {{ item.percent }}
        </span>
            </template>
            <template #item.maximum="{ item }">
        <span>
          {{ item.maximum }}
        </span>
            </template>
            <template #item.minimum="{ item }">
        <span>
          {{ item.minimum }}
        </span>
            </template>
        </ada-data-table>
    </div>
</template>