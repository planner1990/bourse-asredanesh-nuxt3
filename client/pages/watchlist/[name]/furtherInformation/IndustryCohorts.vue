<script setup lang="ts">
import { useFurtherInformation, useInstrument } from "~~/composables";
import {
    WatchListColumns,
    TradesHistorySerachModel, SameSectorQuery, InstrumentSearchModel, InstrumentCache
} from "@/types";
import { useI18n } from "vue-i18n"
import DateTime from "~/components/date/time.vue";

const i18n = useI18n();
const instrumentManager = useInstrument();
const furtherInformationManager = useFurtherInformation();
const instruments: Array<InstrumentCache> = reactive([]);
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
const defaultCols = [
    new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
    new WatchListColumns(i18n.t("instrument.actions").toString(), "actions"),
    new WatchListColumns(i18n.t("instrument.last").toString(), "last"),
    new WatchListColumns(i18n.t("instrument.end").toString(), "end"),
    new WatchListColumns(i18n.t("oms.count").toString(), "count"),
    new WatchListColumns(i18n.t("oms.amount").toString(), "amount"),
    new WatchListColumns(i18n.t("oms.value").toString(), "value")
];

watch(() => instrumentManager.getSelected, () => {
    getTeammateList();
})

async function getTeammateList() {
    if (instrumentManager.getSelected) {
        const teammate: SameSectorQuery = {
            instrument: instrumentManager.getSelected.id,
            sector: instrumentManager.getSelected.sector
        }
        await instrumentManager.getTeammates(teammate).then(async res => {
            await instrumentManager
                .getInstrumentsDetail(new InstrumentSearchModel(res.data)).then(res =>
                    instruments.splice(0, instruments.length, ...res)
                );
        }
        );
    }
}

function focus(item: InstrumentCache) {
    instrumentManager.addFocus(item);
    instrumentManager.activateTab(item);
}

const canFocus = computed(() => {
    if (!process.client) return false;
    return (
        instrumentManager.getFocus.length <
        Math.floor(instrumentManager.width / 360)
    );
});

getTeammateList()

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
        <ada-data-table :items="instruments" :headers="defaultCols" item-key="id"
            class="tw-w-full tw-h-full tw-overflow-y-auto">
            <template #item.name="{ item }">
                <span>
                    {{ item.name }}
                </span>
            </template>
            <template #item.actions="{ item }">
                <div class="text-no-wrap">
                    <ada-icon class="tw-m-0 tw-p-0 tw-mx-2 tw-text-info tw-cursor-pointer" :size="16"
                        @click.stop.prevent="() => focus(item)" :class="[canFocus ? 'tw-text-info' : 'tw-text-gray-500']"
                        :disabled="!canFocus">
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
                    <numeric-field :value="item.last"></numeric-field>
                    <span class="tw-text-gray5 tw-mx-3">|</span>
                    <DateTime :value="item.lastModification" :format="$t('general.date.dt')" class="ltr" />
                </span>
            </template>
            <template #item.end="{ item }">
                <span>
                    <numeric-field :value="item.closing"></numeric-field>
                    <span class="tw-text-gray5 tw-mx-3">|</span>
                    <DateTime :value="item.lastTradeDate" :format="$t('general.date.dt')" class="ltr" />
                </span>
            </template>
            <template #item.count="{ item }">
                <numeric-field :value="item.totalTrades"></numeric-field>
            </template>
            <template #item.amount="{ item }">
                <numeric-field :value="item.totalShares"></numeric-field>
            </template>
            <template #item.value="{ item }">
                <numeric-field :value="item.totalTradesValue"></numeric-field>
            </template>
        </ada-data-table>
    </div>
</template>