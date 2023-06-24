<script setup lang="ts">
import {
  DeepOptions,
  InstrumentCache,
} from "@/types";
import {useAsrTrader, useInstrument} from "~/composables";
import LastPrice from "@/components/oms/lastPrice.vue";

const instrumentManager = useInstrument();
const instruments = computed(() => instrumentManager.getFocus);
const count = ref(0);
const price = ref(0);
const tab = computed({
  get: () => {
    return instrumentManager.getActive;
  },
  set: (val) => {
    instrumentManager.activateTab(val);
  },
});
const selected = computed(() => instrumentManager.state.selected);

function select(val: InstrumentCache) {
  const crt = instrumentManager.state.selected;
  if (crt == null || crt.id != val.id) instrumentManager.select(val);
  else instrumentManager.select(null);
}

function close(id: number) {
  instrumentManager.removeFocus(id);
}

const appManager = useAsrTrader();
const formatter = appManager.formatter;
defineExpose({
  close,
  select,
  LastPrice,
  price,
  count,
  tab,
  instruments,
  deepOptions: DeepOptions,
  formatter
});

</script>

<style lang="postcss" scoped>
.tab-view {
  @apply tw-w-full;

  > .toggle {
    @apply tw-justify-start tw-w-full tw-items-end tw-bg-white tw-bg-opacity-5 tw-transition-all tw-shadow tw-box-border;
    min-height: 32px;

    .ada-button {
      @apply tw-relative tw-mr-2;

      .bar {
        @apply -tw-left-[12px];
      }
    }

    .tab {
      @apply tw-px-2 tw-flex tw-items-center tw-justify-between tw-bg-transparent tw-text-primary tw-transition;
      @apply tw-rounded-none;
      min-width: 168px;

      &.selected {
        @apply tw-rounded-t tw-border-primary tw-border-opacity-80;
        box-shadow: inset 0 0 1px 1px #aebbed;

        &::after {
          background-color: transparent;
        }
      }

      &.active {
        @apply tw-bg-primary/20;
      }

      &::after {
        border-radius: 0 !important;
      }

      .ada-badge {
        span {
          @apply tw-text-error;
        }

        & :deep(.badge) {
          @apply tw-bg-success;
        }
      }

      i {
        @apply tw-text-primary;
      }
    }
  }

  > .tabs {
    min-height: calc(320px - 32px);

    .detail {
      @apply tw-flex tw-flex-grow tw-justify-between;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: white;
        z-index: -1;
      }

      .panel {
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        width: calc(33% - 2px);
      }
    }
  }
}
</style>

<template>
  <div class="tab-view">
    <ada-toggle :height="32" v-model="tab" align-with-title :class="{ active: selected }">
      <ada-btn
          @click="() => select(item)"
          v-for="(item, i) in instruments"
          :key="item.id"
          :model="item"
          name-key="$.instrumentCode"
          :height="32"
          class="tab"
          :class="{ selected: (selected && selected.id == item.id) }"
      >
        <ada-badge dot left offset-y="75%" offset-x="-5">
          {{ item.name }} - &nbsp;
          <numeric-field :value="item.last" class="tw-text-black"/>&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="tw-text-[9px]" dir="ltr"
               :class="item.last < item.yesterdayPrice ? 'tw-text-error' : 'tw-text-success'">
            (% {{ formatter.format(Math.abs((item.yesterdayPrice - item.last) * 100 / item.last)) }})
          </div>
        </ada-badge>
        <ada-icon @click.stop="() => close(item.id)" :size="12">
          mdi-close
        </ada-icon>
        <div v-if="(i != instruments.length - 1)" class="bar"></div>
      </ada-btn>
    </ada-toggle>
    <ada-tabs v-model="tab" name-key="$.instrumentCode">
      <ada-tab
          class="detail"
          :class="item.flow !== 1 ? 'tw-justify-start' : ''"
          v-for="item in instruments"
          :key="item.id"
          :model="item"
          :name="item.instrumentCode"
      >
        <div class="panel">
          <oms-order-queue-card
              :inst="item"
              @count="
              (val) => {
                count = val;
              }
            "
              @price="
              (val) => {
                price = val;
              }
            "
              copy
              responsive
          />
          <oms-legal-real-card :insId="item.id" hide-headers responsive/>
          <ada-col class="col-border tw-align-middle tw-justify-center">
            <dashboard-watch-list-instrument-notifications :value="item"/>
          </ada-col>
        </div>
        <div class="panel" v-if="item.flow === 1">
          <oms-buy-sell-card
              :price.sync="price"
              :count.sync="count"
              :insId="item.instrumentId"
              :insName="item.name"
          />
        </div>
        <div class="panel">
          <oms-instrument-card
              :insId="item.id"
              :insName="item.name"
              @count="
              (val) => {
                count = val;
              }
            "
              @price="
              (val) => {
                price = val;
              }
            "
              responsive
          />
        </div>
      </ada-tab>
    </ada-tabs>
  </div>
</template>
