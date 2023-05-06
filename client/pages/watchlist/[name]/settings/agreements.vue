<script setup lang="ts">
import {useAxios, useBottomPanel, useInstrument} from "~~/composables";

import {AgreementList, TradesHistorySerachModel, WatchListColumns} from "@/types";
import {useI18n} from "vue-i18n"
import {Agreements} from "~/types/oms/agreements";
import ExpansionTable from "~/components/ada/expansionTable.vue";
import {getAgreementsList} from "~/repositories/oms/agreement";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const axios = useAxios().createInstance();
let agreementsList = reactive<Array<AgreementList>>([]);
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
    new WatchListColumns(i18n.t("instrument.row").toString(), "id"),
    new WatchListColumns(i18n.t("instrument.zone").toString(), "area"),
    new WatchListColumns(i18n.t("instrument.title").toString(), "title"),
    new WatchListColumns(i18n.t("instrument.dateOfAgreement").toString(), "startDate"),
    new WatchListColumns(i18n.t("instrument.expirationOfAgreement").toString(), "endDate"),
    new WatchListColumns(i18n.t("instrument.situationOfAgreement").toString(), "id"),
    new WatchListColumns("", "actions", "center", "100px")
];

async function getTradeHistories() {
    for (let i = 0; i < 5; i++) {
        agreementsList.push(
            {
                id: i + 1,
                area: "بيانيه ريسک معاملات بازار پايه",
                title: "معامله در بازار (پایه فرابورس)",
                startDate: "۱۴۰۰/۰۱/۱۰",
                endDate: "۱۴۰۰/۰۱/۱۰"
            }
        );
    }
    bottomPanelManager.setLoading(false);
}

getTradeHistories();
// const {data} = await useFetch(() => getAgreementsList(axios).then(res => {
//     agreementsList = res.data;
// }))
</script>

<template>
    <div class="tw-w-full">
        <expansion-table :cells="agreementsList" :default-cols="defaultCols"></expansion-table>
    </div>
</template>