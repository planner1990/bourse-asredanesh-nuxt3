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
    new WatchListColumns(i18n.t("instrument.position").toString(), "position"),
    new WatchListColumns(i18n.t("instrument.date").toString(), "date"),
    new WatchListColumns(i18n.t("instrument.hour").toString(), "hour"),
    new WatchListColumns(i18n.t("instrument.volTotal").toString(), "volTotal"),
    new WatchListColumns(i18n.t("instrument.price").toString(), "price"),
    new WatchListColumns(i18n.t("accounting.account.credit").toString(), "credit")
];


async function getTradeHistories() {
    const data = {
        row: 1,
        bank: "مهریران ۶۴۹۶۲۶۲۶۴",
        time: "۱۴۰۱/۰۲/۰۴",
        name: "خگستر",
        position: "کارگزاری",
        date: "۱۴۰۱/۰۲/۰۴",
        hour: "۱۲:۲۰",
        volTotal: "۱۲۰",
        price: 12000000,
        credit: 21000000,
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
            width: 20%;
        }

        &:last-child {
            /*width: 14%;*/
        }
    }
}

.select-box {
    width: 23%;
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
    <div class="tw-px-2 tw-pt-9 tw-bg-grayF6">
        <div v-if="showFilter">
            <div class="tw-flex tw-mb-9 filter-boxes tw-justify-between">
                <div class="tw-flex">
                    <div class="tw-ml-11 tw-mr-4">
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
                    <div class="tw-ml-11">
                        <ada-input :placeholder="$t('instrument.dateFrom')"
                                   class="tw-h-9 tw-rounded-[6px] tw-bg-grayF6"></ada-input>
                    </div>
                    <div class="tw-ml-11">
                        <ada-input :placeholder="$t('instrument.dateTo')"
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
                </div>
                <div class="tw-ml-6 tw-flex">
                    <ada-btn class="tw-h-full tw-w-full tw-bg-primary tw-text-white tw-min-w-[137px] tw-ml-3">
                        {{ $t("instrument.filter") }}
                    </ada-btn>
                    <ada-btn class="tw-h-full tw-bg-error tw-text-white tw-px-3 tw-min-w-[73px]">
                        {{ $t("general.delete") }}
                    </ada-btn>
                    <ada-btn
                            class="tw-min-w-[85px] tw-min-h-[27px] tw-text-[10px] tw-px-3 tw-rounded-[6px] tw-mr-3"
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
            <template #item.price="{ item }">
                <NumericField :value="item.price"/>
            </template>
            <template #item.credit="{ item }">
                <NumericField :value="item.credit"/>
            </template>
        </ada-data-table>
    </div>
</template>
