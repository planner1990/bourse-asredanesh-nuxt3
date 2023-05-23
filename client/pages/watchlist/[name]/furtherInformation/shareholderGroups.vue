<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import {
    WatchListColumns,
    TradesHistorySerachModel
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
const entryAndExitHistoryList = reactive<Array<any>>([]);
const inst = instrumentManager.getSelected;
const defaultCols = [
    new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
    new WatchListColumns(i18n.t("instrument.actions").toString(), "actions"),
    new WatchListColumns(i18n.t("instrument.last").toString(), "last"),
    new WatchListColumns(i18n.t("instrument.end").toString(), "end"),
    new WatchListColumns(i18n.t("oms.count").toString(), "count"),
    new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
    new WatchListColumns(i18n.t("oms.value").toString(), "value")
];


async function getTradeHistories() {
    const data = {
        name: "خگستر۲",
        last: "3,554",
        end: "3,554",
        count: "0",
        amount: "0",
        value: "0"
    }
    for (let i = 0; i <= 6; i++) {
        entryAndExitHistoryList.push(data);
    }
    bottomPanelManager.setLoading(false);
}

getTradeHistories();
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
        <ada-data-table :items="entryAndExitHistoryList" :headers="defaultCols" item-key="dateTime"
                        class="tw-w-full tw-h-full tw-overflow-y-auto">
            <template #item.name="{ item }">
        <span>
          {{ item.name }}
        </span>
            </template>
            <template #item.actions>
                <div class="text-no-wrap">
                    <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-text-info" :size="16">
                        isax-eye
                    </ada-icon>
                    <ada-icon class="tw-m-0 tw-p-0 tw-ml-2 tw-text-success" :size="16">
                        isax-bag-tick-2
                    </ada-icon>
                    <ada-icon class="tw-m-0 tw-p-0 tw-text-error" :size="16">
                        isax-bag-cross-1
                    </ada-icon>
                </div>
            </template>
            <template #item.last="{ item }">
        <span>
          {{ item.last }} <span class="tw-text-gray5 tw-mx-3">|</span> 0
        </span>
            </template>
            <template #item.end="{ item }">
        <span>
          {{ item.end }} <span class="tw-text-gray5 tw-mx-3">|</span> 0
        </span>
            </template>
            <template #item.count="{ item }">
        <span>
          {{ item.count }}
        </span>
            </template>
            <template #item.amount="{ item }">
        <span>
          {{ item.amount }}
        </span>
            </template>
            <template #item.value="{ item }">
        <span>
          {{ item.value }}
        </span>
            </template>
        </ada-data-table>
    </div>
</template>