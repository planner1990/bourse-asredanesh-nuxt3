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
const showFilter = ref<boolean>(true);
const inst = instrumentManager.getSelected;
const defaultCols = [
    new WatchListColumns(i18n.t("instrument.row").toString(), "row"),
    new WatchListColumns(i18n.t("instrument.time").toString(), "time"),
    new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
    new WatchListColumns(i18n.t("instrument.system").toString(), "system"),
    new WatchListColumns(i18n.t("instrument.situation").toString(), "situation"),
    new WatchListColumns(i18n.t("instrument.actions").toString(), "actions")
];


async function getTradeHistories() {
    const data = {
        row: 1,
        bank: "مهریران ۶۴۹۶۲۶۲۶۴",
        time: "۱۴۰۱/۰۲/۰۴",
        name: "خگستر",
        system: "سامانه بورس",
        situation: "در حال انجام",
        actions: "---",
    }
    for (let i = 0; i <= 4; i++) {
        directorateList.push(data);
    }
    bottomPanelManager.setLoading(false);
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
            width: 12%;
        }

        &:last-child {
            /*width: 14%;*/
        }
    }
}

.select-box {
    width: 12%;
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
        <div class="tw-flex tw-justify-end tw-py-3 tw-px-6">
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
                <div class="tw-ml-11 tw-mr-4 select-box">
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
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.dateFrom')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.dateTo')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.search')"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
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
                <div class="tw-ml-11 select-box">
                    <select name="cars" id="cars"
                            class="tw-h-9">
                        <option value="volvo">پیوست</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                    </select>
                    <ada-icon :size="14" class="tw-absolute tw-top-2 tw-left-2">
                        isax-arrow-down
                    </ada-icon>
                </div>
                <div class="tw-ml-3">
                    <ada-btn class="tw-h-full tw-w-full tw-bg-primary tw-text-white tw-min-w-[137px]">
                        {{ $t("instrument.filter") }}
                    </ada-btn>
                </div>
                <div class="tw-justify-end tw-flex tw-ml-6">
                    <ada-btn class="tw-h-full tw-bg-error tw-text-white tw-px-3 tw-min-w-[73px]">
                        {{ $t("general.delete") }}
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
