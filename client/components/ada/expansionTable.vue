<script setup lang="ts">
import {useAxios, useBottomPanel, useInstrument} from "~~/composables";

import {
    WatchListColumns
} from "@/types";
import {useI18n} from "vue-i18n"
import {Agreements} from "~/types/oms/agreements";
import {confirmAgreement} from "~/repositories/oms/agreement";

const i18n = useI18n();
const bottomPanelManager = useBottomPanel();
const instrumentManager = useInstrument();
const axios = useAxios().createInstance();
let opened = reactive<Array<any>>([]);
const props = defineProps<{
    defaultCols: WatchListColumns[];
    text?: any;
    cells: Agreements[];
    dynamicClass?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const inst = instrumentManager.getSelected;
const isChecked = reactive<Array<any>>([]);

function toggle(id: any) {
    const index = opened.indexOf(id);
    if (index > -1) {
        opened.splice(index, 1)
    } else {
        opened.push(id)
    }
}

function doConfirmAgreement(id) {
    confirmAgreement(id, axios).then(res => {
        console.log(res);
    })
}

function doCheck(id) {
    isChecked.push(id);
}

</script>
<style lang="postcss">

.agreements-header {
    @apply tw-bg-primary tw-bg-opacity-10;
    height: 32px !important;

    td {
        @apply tw-text-sm tw-font-semibold tw-text-[#4C4C4C];
    }

    td:nth-child(6) {
        border-left: none;
    }

    td:first-child {
        border-radius: 0 8px 0 0;
    }

    td:last-child {
        border-radius: 8px 0 0 0;
    }
}

.agreements-cells {
    td {
        @apply tw-text-sm tw-text-gray2 tw-font-medium tw-h-[32px];
    }
}

.agreements-expansion {
    td {
        @apply tw-text-justify tw-px-12 tw-pt-3 tw-pb-9 tw-text-sm tw-text-gray2;
        width: 500px;
    }
}


.checkbox input[type="checkbox"] {
    width: auto;
    opacity: 0.00000001;
    position: absolute;
    left: 0;
    margin-left: -20px;
}

.checkbox label {
    position: relative;
}

.checkbox label:before {
    content: '';
    position: absolute;
    left: -9px;
    top: -6px;
    margin: 0 4px;
    width: 13px;
    height: 13px;
    transition: transform 0.28s ease;
    border-radius: 3px;
    border: 1px solid rgb(53, 84, 209);
}

.checkbox label:after {
    content: '';
    display: block;
    width: 10px;
    height: 5px;
    border-bottom: 2px solid rgb(53, 84, 209);
    border-left: 2px solid rgb(53, 84, 209);
    -webkit-transform: rotate(-45deg) scale(0);
    transform: rotate(-45deg) scale(0);
    transition: transform ease 0.25s;
    will-change: transform;
    position: absolute;
    top: -3px;
    left: -4px;
}

.checkbox input[type="checkbox"]:checked ~ label::before {
    color: #7bbe72;
}

.checkbox input[type="checkbox"]:checked ~ label::after {
    -webkit-transform: rotate(-45deg) scale(1);
    transform: rotate(-45deg) scale(1);
}

.checkbox input[type="checkbox"]:focus + label::before {
    outline: 0;
}

.agreements-button {
    width: 98px;
    height: 28px;
    background-color: rgba(0, 189, 121, 0.15);
    color: rgb(0, 189, 121);

    &_icon {
        margin-top: 1px;
        margin-left: 6px;
        color: rgb(0, 189, 121) !important;
    }
}

.disagreement-button {
    width: 98px;
    height: 28px;
    background-color: rgba(239, 57, 78, 0.15);
    color: rgb(255, 59, 48);
    margin-right: 12px;

    &_icon {
        margin-top: 1px;
        margin-left: 6px;
        color: rgba(239, 57, 78, 1) !important;
    }
}

</style>
<template>
    <div class="tw-w-full tw-p-3">
        <table class="tw-w-full tw-text-center ">
            <tr class="agreements-header">
                <td v-for="header in defaultCols" class="tw-p-2">
                    {{ header.text }}
                </td>
            </tr>
            <template v-for="cell in cells">
                <tr :class="{ opened: opened.includes(cell.id) }" class="agreements-cells tw-bg-grayF8"
                    :style="{ 'border-bottom':  opened.includes(cell.id) ? '1px solid transparent' : '1px solid rgba(216,216,216,0.6)' }">
                    <!--          <td v-for="item in cell">{{ item }}</td>-->
                    <td>{{ cell.id }}</td>
                    <td>{{ cell.area }}</td>
                    <td>{{ cell.title }}</td>
                    <td>{{ cell.startDate }}</td>
                    <td>{{ cell.endDate }}</td>
                    <td>{{ cell.startDate ? 'تایید شده' : 'تایید نشده' }}</td>
                    <td>
                        <ada-icon
                                class="tw-m-0 tw-p-0 tw-mx-2"
                                :size="18"
                                @click="toggle(cell.id)">
                            mdi-{{ opened.includes(cell.id) ? 'chevron-up' : 'chevron-down' }}
                        </ada-icon>
                    </td>
                </tr>
                <tr v-if="opened.includes(cell.id)" class="agreements-expansion">
                    <!--                    <slot name="expansion-message"></slot>-->
                    <td colspan="6">
                        {{ cell.description }}
                        <div class="tw-flex tw-justify-between tw-mt-5">
                            <div class="tw-flex tw-text-primary tw-items-center">
                                <div class="checkbox">
                                    <input type="checkbox" :id="cell.id" :name="cell.id" v-model="cell.id"
                                           @click="doCheck(cell.id)">
                                    <label :for="cell.id"><span></span></label>
                                </div>
                                <div class="tw-mr-3 tw-font-semibold"><span
                                        v-text="$t('general.agreementsText')"></span>
                                </div>
                            </div>
                            <div>
                                <ada-btn class="agreements-button" @click="doConfirmAgreement(cell.id)">
                                    <ada-icon class="agreements-button_icon" :size="13">
                                        isax-tick-circle
                                    </ada-icon>
                                    <span v-text="$t('general.ConfirmAgree')"></span>
                                </ada-btn>
                            </div>
                        </div>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>