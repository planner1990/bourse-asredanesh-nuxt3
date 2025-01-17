<script setup lang="ts">
import {Instrument, InstrumentCache, OrderQueueItem} from "@/types";
import {useAsrTrader, useInstrument, useOrderQue, useFurtherInformation} from "~/composables";

const emit = defineEmits(["count", "price"]);
const props = withDefaults(
    defineProps<{
        inst: Instrument | InstrumentCache;
        copy?: boolean;
        responsive?: boolean;
        extraCol?: boolean;
    }>(),
    {
        copy: false,
        responsive: false,
        extraCol: false,
    }
);

const appManager = useAsrTrader();
const instrumentManager = useInstrument();
const orderQueManager = useOrderQue();
const FurtherInformationManager = useFurtherInformation();
const formatter = appManager.formatter;
const instrument = ref<InstrumentCache | null>(null);
const amountCum = reactive<Array<{ id: number, amount: number }>>([]);
const change = computed(() => (price: number) => {
    if (instrument.value && price) {
        return ((price - instrument.value.last) / price) * 100;
    }
    return 0;
});
const totalBuy = computed(() => {
    let tmp = 0;
    queue.value.forEach((item) => {
        tmp += item.buy.count * item.buy.amount;
    });
    return tmp;
});
const totalSell = computed(() => {
    let tmp = 0;
    queue.value.forEach((item) => {
        tmp += item.sell.count * item.sell.amount;
    });
    return tmp;
});
const totalQueue = computed(() => totalBuy.value + totalSell.value);

//TODO Replace in vue 3
const queue = computed(() => instrumentManager.getOrderQueue(props.inst));
FurtherInformationManager.setQueueData(queue);

function getAmount(amount: number) {
    orderQueManager.showAmount(amount)
}

function getCumulativeVolume(amount: number, index: number) {
    let sum = 0;
    if (amountCum.length === 0) {
        amountCum.push({id: index, amount});
    } else if (amountCum.length !== 0 && amountCum.findIndex((item) => item.id === index) == -1) {
        amountCum.push({id: index, amount});
    }
    for (let index = 0; index < amountCum.length; index++) {
        sum += amountCum[index].amount;
    }
    orderQueManager.showAmount(sum);
}

function resetCumulativeVol() {
    amountCum.splice(0);
    orderQueManager.resetAmount();
}

defineExpose({
    formatter,
    change,
    queue,
    totalBuy,
    totalSell,
    totalQueue,
});
</script>

<style lang="postcss" scoped>
.order-queue {
    > header {
        width: 99.5%;
        margin: 0 auto;
        @apply tw-grid tw-grid-cols-6 tw-text-center;
        height: var(--row-height);
        line-height: var(--row-height);

        > div {
            font-size: 0.75rem !important;
            font-weight: 700;
            max-height: var(--row-height);
        }

        .sell {
            background-color: #efeff1;
        }

        .buy {
            background-color: #e0e0e0;
        }
    }

    .queue {
        @apply tw-grid tw-grid-cols-6;
        position: relative;

        > div {
            height: 31px;
            line-height: var(--row-height);
        }

        > .field {
            @apply tw-text-center;
            position: relative;
        }
    }

    .col-border {
        border-bottom: 1px solid #e0e0e0;
    }
}
</style>
<template>
    <div class="order-queue" fluid tabindex="0">
        <header>
            <div class="buy">
                {{ $t("oms.count") }}
            </div>
            <div class="buy">
                {{ $t("oms.amount") }}
            </div>
            <div class="buy">
                {{ $t("oms.buy") }}
            </div>
            <div class="sell">
                {{ $t("oms.sell") }}
            </div>
            <div class="sell">
                {{ $t("oms.amount") }}
            </div>
            <div class="sell">
                {{ $t("oms.count") }}
            </div>
        </header>
        <div class="queue col-border" v-for="(item, index) in queue"
             :key="item.sell.price + '-' + item.buy.price + '-' + index">
            <double-bar-chart :left="totalSell ? (item.sell.count * item.sell.amount * 100) / totalSell : 0"
                              :right="totalBuy ? (item.buy.count * item.buy.amount * 100) / totalBuy : 0"/>
            <div class="copy-cursor field" @click="
        () => {
          $emit('count', item.buy.count);
        }
      ">
                <numeric-field :value="item.buy.count"></numeric-field>
            </div>
            <div class="field" @click.ctrl="getCumulativeVolume(item.buy.amount, index)">
                <!--                :class="amountCum[index]?.id ? 'tw-bg-primary' : '' "-->
                <numeric-field :value="item.buy.amount"
                               @click="getAmount(item.buy.amount)"
                ></numeric-field>
            </div>
            <div class="copy-cursor field" @click="
        () => {
          $emit('price', item.buy.price);
        }
      ">
                <numeric-field :value="item.buy.price">
                    <!-- <span
                        :class="[change(item.sell.price) < 0 ? 'error--text' : 'success--text']"
                        style="font-size: 7px !important"
                      >
                        (%{{ formatter.format(change(item.buy.price)) }})
                      </span> -->
                </numeric-field>
                <div class="bar"></div>
            </div>
            <div class="copy-cursor field" @click="
        () => {
          $emit('price', item.sell.price);
        }
      ">
                <numeric-field :value="item.sell.price">
                    <!-- <span
                        :class="[change(item.sell.price) < 0 ? 'error--text' : 'success--text']"
                        style="font-size: 7px !important"
                      >
                        (%{{ formatter.format(change(item.buy.price)) }})
                      </span> -->
                </numeric-field>
            </div>
            <div class="field" @click.ctrl="getCumulativeVolume(item.sell.amount, index)">
                <numeric-field :value="item.sell.amount" @click="getAmount(item.sell.amount)"></numeric-field>
            </div>
            <div class="copy-cursor field" @click="
        () => {
          $emit('count', item.sell.count);
        }
      ">
                <numeric-field :value="item.sell.count"></numeric-field>
            </div>
        </div>
    </div>
</template>
