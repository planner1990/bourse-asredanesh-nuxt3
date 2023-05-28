<script setup lang="ts">
import {useBottomPanel, useFurtherInformation, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
    WatchListColumns,
    TradesHistorySerachModel
} from "@/types";
import {useI18n} from "vue-i18n"

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const FurtherInformationManager = useFurtherInformation();
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
const entryAndExitHistoryList = reactive<Array<any>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
    new WatchListColumns(i18n.t("oms.count").toString(), "count"),
    new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
    new WatchListColumns(i18n.t("oms.buy").toString(), "buy"),
    new WatchListColumns(i18n.t("oms.sell").toString(), "sell"),
    new WatchListColumns(i18n.t("oms.amount").toString(), "amount2"),
    new WatchListColumns(i18n.t("oms.count").toString(), "count2")
];
const queue = computed(() => FurtherInformationManager.queueData);
watch(queue, () => {
    entryAndExitHistoryList.splice(0);
    entryAndExitHistoryList.push(queue.value[0].value);
})

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
        <ada-data-table :items="entryAndExitHistoryList[0]" :headers="defaultCols" item-key="dateTime"
                        class="tw-w-full tw-h-full tw-overflow-y-auto">
            <template #item.buy="{ item }">
                <numeric-field :value="item.buy.price"></numeric-field>
            </template>
            <template #item.count="{ item }">
                <numeric-field :value="item.buy.count"></numeric-field>
            </template>
            <template #item.amount="{ item }">
                <numeric-field :value="item.buy.amount"></numeric-field>
            </template>
            <template #item.amount2="{ item }">
                <numeric-field :value="item.sell.amount"></numeric-field>
            </template>
            <template #item.count2="{ item }">
                <numeric-field :value="item.sell.count"></numeric-field>
            </template>
            <template #item.sell="{ item }">
                <numeric-field :value="item.sell.price"></numeric-field>
            </template>
        </ada-data-table>
    </div>
</template>