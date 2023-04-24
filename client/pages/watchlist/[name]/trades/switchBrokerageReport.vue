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
    @apply tw-text-gray4 tw-font-light;
}

:deep(.label) {
    @apply tw-mb-3;
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
        color: rgb(189, 189, 189);
        appearance: none;
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
        background-color: white;
    }
}

label {
    @apply tw-font-semibold tw-text-sm tw-mb-3;

}
</style>
<template>
    <div class="tw-px-2 tw-bg-grayF6">
        <div v-if="showFilter" class="tw-pt-5">
            <div class="tw-flex tw-items-end tw-mb-9 filter-boxes">
                <div class="tw-ml-11 tw-mr-4">
                    <ada-input :placeholder="$t('instrument.dateFrom')" label="از تاریخ"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-white"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.dateTo')" label="تا تاریخ"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-white"></ada-input>
                </div>
                <div class="tw-ml-11">
                    <ada-input :placeholder="$t('instrument.search')" label="نماد"
                               class="tw-h-9 tw-rounded-[6px] tw-bg-white"></ada-input>
                </div>
                <div class="tw-ml-11 select-box">
                    <label for="situation" class="tw-block">وضعیت</label>
                    <select name="situation" id="situation"
                            class="tw-h-9">
                        <option value="volvo">همه موارد</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                    <ada-icon :size="14" class="tw-absolute tw-top-10 tw-left-2">
                        isax-arrow-down
                    </ada-icon>
                </div>
                <div class="tw-ml-11 select-box">
                    <label for="attachment" class="tw-block">پیوست</label>
                    <select name="attachment" id="attachment"
                            class="tw-h-9">
                        <option value="volvo">همه موارد</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                    </select>
                    <ada-icon :size="14" class="tw-absolute tw-top-10 tw-left-2">
                        isax-arrow-down
                    </ada-icon>
                </div>
                <div class="tw-ml-3">
                    <ada-btn
                            class="tw-h-full tw-w-full tw-bg-primary tw-text-white tw-min-w-[100px] tw-min-h-[27px] tw-font-semibold tw-text-sm">
                        {{ $t("instrument.filter") }}
                    </ada-btn>
                </div>
                <div class="tw-justify-end tw-flex tw-ml-6">
                    <ada-btn
                            class="tw-h-full tw-bg-gray5 tw-text-gray3 tw-px-3 tw-min-w-[73px] tw-min-h-[27px] tw-font-semibold tw-text-sm">
                        {{ $t("general.delete") }}
                    </ada-btn>
                </div>
                <div class="tw-flex">
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
                            class="tw-min-w-[70px] tw-min-h-[27px] tw-text-[10px] tw-px-3 tw-rounded-[6px] tw-ml-5"
                            :class="showFilter ? 'tw-bg-success tw-text-white' :
                         'tw-bg-gray5 tw-text-gray3 tw-border-none'">
                        <ada-icon :size="14" class="tw-ml-2" :class="showFilter ? 'tw-text-white' : 'tw-text-gray3'">
                            isax-document-text
                        </ada-icon>
                        {{ $t("instrument.excel") }}
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