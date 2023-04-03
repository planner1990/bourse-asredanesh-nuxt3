<script setup lang="ts">
import {useBottomPanel, useInstrument} from "~~/composables";
import NumericField from "@/components/numericField.vue";
import {
    WatchListColumns,
    TradesHistorySerachModel,
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
const directorateList = reactive<Array<any>>([]);
const showFilter = ref<boolean>(false);
const inst = instrumentManager.getSelected;
const defaultCols = [
    new WatchListColumns(i18n.t("instrument.receiptNumber").toString(), "receiptNumber"),
    new WatchListColumns(i18n.t("instrument.bank").toString(), "bank"),
    new WatchListColumns(i18n.t("instrument.registrationDateReceipt").toString(), "registrationDateReceipt"),
    new WatchListColumns(i18n.t("instrument.receiptDate").toString(), "receiptDate"),
    new WatchListColumns(i18n.t("instrument.doneDate").toString(), "doneDate"),
    new WatchListColumns(i18n.t("instrument.receiptAmount").toString(), "receiptAmount"),
    new WatchListColumns(i18n.t("instrument.registeredAmount").toString(), "registeredAmount"),
    new WatchListColumns(i18n.t("instrument.status").toString(), "status"),
    new WatchListColumns(i18n.t("instrument.brokerMessage").toString(), "brokerMessage"),
    new WatchListColumns(i18n.t("instrument.actions").toString(), "actions")
];


async function getTradeHistories() {
    const data = {
        receiptNumber: "۵۴۶۲۱۴۵۶۵",
        bank: "مهریران ۶۴۹۶۲۶۲۶۴",
        registrationDateReceipt: "۱۴۰۱/۰۲/۰۴",
        receiptDate: "۱۴۰۱/۰۲/۰۴",
        doneDate: "۱۴۰۱/۰۲/۰۴",
        receiptAmount: 2400000000,
        registeredAmount: 2400000000,
        status: "اقدام گردید",
        brokerMessage: "---",
        actions: "---",
    }
    for (let i = 0; i <= 6; i++) {
        directorateList.push(data);
    }
    bottomPanelManager.setLoading(false);
}

function addFilters() {
    showFilter.value = showFilter.value !== true;
}

getTradeHistories();
</script>
<style lang="postcss" scoped>

:deep(input::placeholder) {
    @apply tw-text-gray2;
}

:deep(.headers[data-v-8d846923]) {
    @apply tw-bg-primary tw-bg-opacity-10 tw-text-gray3 tw-font-medium;
}

:deep(.bar) {
    @apply tw-border-default;
}

:deep(th h6) {
    @apply tw-text-gray2;
}

:deep(.scaffold) {
    border: none;
}

.filter-boxes {
    div {
        :deep(input) {
            @apply tw-border tw-border-gray4;
            width: 14%;
        }

        &:last-child {
            width: 14%;
        }
    }
}

.select-box {
    width: 14%;
    position: relative;

    select {
        border: 1px solid rgb(189, 189, 189);
        border-radius: 6px;
        width: 100%;
        padding: 0 4px;
        color: rgb(79, 79, 79);
        appearance: none;
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
    }
}
</style>
<template>
    <div class="tw-px-2 tw-bg-grayF6">
        <div class="tw-flex tw-justify-between tw-py-3 tw-px-6">
            <div class="tw-flex">
                <ada-input :placeholder="$t('instrument.searchCredit')"
                           class="tw-h-9 tw-bg-white tw-rounded-[6px]"></ada-input>
                <ada-btn
                        class="tw-ml-3 tw-bg-primary tw-text-white tw-min-w-[72px] tw-min-h-[27px] tw-text-[10px]
                         tw-px-3 tw-rounded-[6px] tw-mr-2">
                    <ada-icon :size="14" class="tw-text-white tw-ml-2">isax-search-normal</ada-icon>
                    {{ $t("user.search") }}
                </ada-btn>
                <ada-btn @click="addFilters"
                         class="tw-ml-6 tw-bg-transparent tw-text-primary tw-border tw-border-primary
                        tw-min-w-[85px] tw-min-h-[27px] tw-text-[10px] tw-px-3 tw-rounded-[6px]">
                    <ada-icon :size="14" class="tw-text-primary tw-ml-2">isax-filter</ada-icon>
                    {{ $t("instrument.filter") }}
                </ada-btn>
            </div>
            <div>
                <ada-btn
                        class="tw-ml-3 tw-min-w-[85px] tw-min-h-[27px] tw-text-[10px] tw-px-3 tw-rounded-[6px]"
                        :class="showFilter ? 'tw-bg-error tw-text-white' :
                         'tw-bg-gray5 tw-text-gray3 tw-border-none'">
                    <ada-icon :size="14" class="tw-ml-2" :class="showFilter ? 'tw-text-white' : 'tw-text-gray3'">
                        isax-document-text
                    </ada-icon>
                    {{ $t("instrument.pdf") }}
                </ada-btn>
                <ada-btn
                        class="tw-min-w-[85px] tw-min-h-[27px] tw-text-[10px] tw-px-3 tw-rounded-[6px]"
                        :class="showFilter ? 'tw-bg-success tw-text-white' :
                         'tw-bg-gray5 tw-text-gray3 tw-border-none'">
                    <ada-icon :size="14" class="tw-ml-2" :class="showFilter ? 'tw-text-white' : 'tw-text-gray3'">
                        isax-document-text
                    </ada-icon>
                    {{ $t("instrument.excel") }}
                </ada-btn>
            </div>
        </div>
        <div v-if="showFilter">
            <div class="tw-mt-7 tw-mb-3 tw-mr-4 tw-text-gray2 tw-font-semibold">فیلترها</div>
            <div class="tw-flex tw-mb-9 filter-boxes">
                <div class="tw-ml-11 tw-mr-4">
                    <ada-input :placeholder="$t('instrument.dateFrom')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.dateTo')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.priceFrom')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.priceTo')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11 select-box">
                    <select name="cars" id="cars"
                            class="tw-h-9">
                        <option value="volvo">بانک</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <ada-icon :size="14" class="tw-absolute tw-top-2 tw-left-2">
                        isax-arrow-down
                    </ada-icon>
                </div>
                <div class="tw-ml-11 select-box">
                    <select name="cars" id="cars"
                            class="tw-h-9">
                        <option value="volvo">وضعیت</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <ada-icon :size="14" class="tw-absolute tw-top-2 tw-left-2">
                        isax-arrow-down
                    </ada-icon>
                </div>
                <div class="tw-ml-4">
                    <ada-btn class="tw-h-full tw-w-full tw-bg-primary tw-text-white">
                        {{ $t("user.search") }}
                    </ada-btn>
                </div>
            </div>
        </div>
        <ada-data-table :items="directorateList" :headers="defaultCols" item-key="dateTime"
                        class="tw-w-full tw-h-full tw-overflow-y-auto">
            <template #item.receiptAmount="{ item }">
                <NumericField :value="item.receiptAmount" class="tw-text-success"/>
            </template>
            <template #item.registeredAmount="{ item }">
                <NumericField :value="item.registeredAmount" class="tw-text-success"/>
            </template>
            <template #item.status="{ item }">
                <span class="tw-text-info">{{ item.status }}</span>
            </template>
        </ada-data-table>
    </div>
</template>
