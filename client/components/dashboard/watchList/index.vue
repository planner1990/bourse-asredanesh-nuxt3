<script setup lang="ts">
import {
  WatchListColumns,
  DefaultCols,
  InstrumentCache,
  Side,
  InstrumentStatus,
} from "@/types";
import {
  useInstrument,
  useOrder,
  useUser,
  useNotifications,
  useWebSocket,
} from "@/composables";
import {useShortcut} from "@/utils/shortcutManager";
import {useI18n} from "vue-i18n";
import {DateTime} from "luxon"
import {encode} from "@msgpack/msgpack";

const props = withDefaults(
    defineProps<{
      searchModel: any;
      paginated?: boolean;
    }>(),
    {
      paginated: false,
    }
);

const ws = useWebSocket();

watch(
    () => props.searchModel,
    (update) => {
      refresh();
    },
    {deep: true}
);

const emit = defineEmits(['update:searchModel']);


const i18n = useI18n();
const userManager = useUser();
const instrumentManager = useInstrument();
const orderManager = useOrder();
const route = useRoute();
const sh = useShortcut();
const itemToDelete = ref<InstrumentCache | null>(null);
const _instruments: Array<InstrumentCache> = reactive([]);
const confirmInstrumentRemoval = ref(false);
const notificationManager = useNotifications();
//////////////////////

const name = route.params.name as string;

let instruments = computed(() => {
  return _instruments.filter((item) => {
    return focused.findIndex((i) => i.id === item.id) == -1;
  });
});

async function refresh() {
  _instruments.splice(0, Infinity);
  _instruments.push(
      ...(await instrumentManager.getInstrumentsDetail(props.searchModel))
  );
  ws.send({
    agent: "Web-Client",
    referenceNumber: "",
    typ: "Instrument.Register",
    time: null,
    packetTime: DateTime.now().toISO(),
    obj: encode(_instruments.map((item) => item.instrumentCode)),
    detail: null
  });
  await notificationManager.initNotifications(
      props.searchModel.ids.map((id: number) => id.toString())
  );
}

const selected = computed(() => instrumentManager.state.selected);

const focused = instrumentManager.getFocus;
const canFocus = computed(() => {
  if (!process.client) return false;
  return (
      instrumentManager.getFocus.length <
      Math.floor(instrumentManager.width / 360)
  );
});

const headers = computed(() => {
  const res: Array<WatchListColumns> = [];
  const actions = new WatchListColumns("", "actions", "center", "100px");
  actions.draggable = false;
  actions.divider = false;
  res.push(actions);
  res.push(
      ...((userManager.me.settings.columns ?? DefaultCols()).map((col: WatchListColumns) => {
        if (col == null)
          return {
            id: "",
            text: "",
            value: "",
          };
        return Object.assign({}, col, {
          text: col.text == "" ? "" : i18n.t(col.id),
        });
      }) as WatchListColumns[])
  );
  const status = new WatchListColumns(
      "instrument.notifications",
      "notifications",
      "center",
      "123px"
  );
  status.text = i18n.t(status.id)
  status.draggable = false;
  res.push(status);
  const more = new WatchListColumns("", "more");
  more.draggable = false;
  more.divider = false;
  res.push(more);
  return res;
});

function headerChange(value: Array<WatchListColumns>) {
  const tmp = value
  tmp.pop()
  tmp.pop()
  tmp.splice(0, 1)
  userManager.me.settings.columns = tmp
  userManager.update_settings({
    path: "/columns",
    value: value
  })
}

////////////////////////////

function parseStatus(state: number) {
  switch (state & 7) {
    case InstrumentStatus.Active:
      return "instrument.state.active";
    case InstrumentStatus.ActiveOrder:
      return "instrument.state.activeOrder";
    case InstrumentStatus.ActiveTrading:
      return "instrument.state.activeTrading";
    case InstrumentStatus.ActiveRead:
      return "instrument.state.activeRead";
    case InstrumentStatus.Inactive:
      return "instrument.state.inactive";
    case InstrumentStatus.Disabled:
      return "instrument.state.disabled";
    case InstrumentStatus.PreActive:
      return "instrument.state.preActive";
    default:
      return "";
  }
}

function select(item: InstrumentCache) {
  const crt = instrumentManager.state.selected;
  if (crt == null || crt.id != item.id) instrumentManager.select(item);
  else instrumentManager.select(null);
}

function order(item: InstrumentCache, side: Side) {
  orderManager.setSide(side, item.id.toString());
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
}

function focus(item: InstrumentCache) {
  instrumentManager.activateTab(item);
  instrumentManager.addFocus(item);
}

async function remove(val: InstrumentCache | null) {
  if (val) {
    const payload = {
      searchModel: props.searchModel,
      item: val
    }
    await userManager.removeWatchlist(payload)
  }
}

let dragItem: InstrumentCache | null = null;

function drag(item: InstrumentCache) {
  dragItem = item;
}

async function drop(item: InstrumentCache) {
  if (dragItem && dragItem != item) {
    const wl = {...props.searchModel}
    const ind = wl.ids.findIndex((i: number) => i == dragItem?.id);
    wl.ids.splice(ind, 1);
    const target = wl.ids.findIndex((i: number) => i == item.id);
    wl.ids.splice(ind > target ? target : target + 1, 0, dragItem?.id);
    userManager.me.settings.watch_lists[name] = wl.ids
    await userManager.update_settings({
      path: "/watch_lists/" + name,
      value: wl.ids,
    });
  }
  dragItem = null;
}

const removeWatchList = (item: InstrumentCache): void => {
  itemToDelete.value = item;
  confirmInstrumentRemoval.value = true;
};

//////////////////////////////////////////

if (process.client) {
  sh.addShortcut({
    key: "alt+shift+a",
    action: () => {
      const item = instrumentManager.state.selected;
      if (item) {
        instrumentManager.activateTab(item);
        instrumentManager.updateInstrumentById(
            Object.assign({}, item, {
              side: Side.Buy,
            })
        );
        instrumentManager.setFocusMode(0);
      }
    },
  });
  sh.addShortcut({
    key: "alt+shift+s",
    action: () => {
      const item = instrumentManager.state.selected;
      if (item) {
        instrumentManager.activateTab(item);
        instrumentManager.updateInstrumentById(
            Object.assign({}, item, {
              id: item.id,
              side: Side.Sell,
            })
        );
        instrumentManager.setFocusMode(0);
      }
    },
  });
}

//////////////////////////////////

refresh();
</script>

<style lang="postcss" scoped>
.watchlist {
  background-color: white;

  .header {
    padding: 0 4px;
    font-size: 0.8334rem;
  }

  .row-border {
    cursor: pointer;

    td {
      @apply tw-transition-all;
    }

    &.active {
      position: relative;
      background-color: rgba(var(--c-selected-inst), 0.1);
      @apply tw-border tw-border-dashed tw-border-primary;

      &::befor {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: -1;
      }

      & :deep(td) {
        @apply tw-border-dashed tw-border-t-[1.2px] tw-border-b tw-border-primary tw-rounded-t tw-rounded-b;
      }
    }

    .ada-badge {
      .badge {
        @apply tw-ml-[1px];
      }

      &.error :deep(.badge) {
        @apply tw-bg-error;
      }

      &.warning :deep(.badge) {
        @apply tw-bg-warning;
      }

      &.success :deep(.badge) {
        @apply tw-bg-success;
      }
    }
  }
}

.dialog-delete {
  width: 40vw;
  font-family: "Iran Sans X FaNum", sans-serif !important;

  .ada-button {
    @apply tw-text-white tw-w-16;

    &:first-child {
      @apply tw-bg-info tw-bg-opacity-80;
    }

    &:last-child {
      @apply tw-bg-error tw-mr-2 tw-bg-opacity-90;
    }

    &:hover {
      @apply tw-bg-opacity-100;
    }
  }
}

.activeRow {
  background-color: #E7EAF9;
  box-shadow: inset 0 0 1px 1px #AEBBED;

  &:hover {
    background-color: #E7EAF9;
    box-shadow: inset 0 0 1px 1px #AEBBED;
  }
}
</style>

<template>
  <div class="pb-1">
    <ada-data-table :headers="headers" @headers-changed="headerChange" :items="instruments" item-key="id"
                    class="watchlist" hide-default-header hide-default-footer disable-pagination dense>
      <template #header.more>
        <dashboard-watch-list-header-selector/>
      </template>
      <ada-data-table-row-handler draggable="true" @dragstart="(ev) => drag(item)" @dragover="
        (ev) => {
          ev.preventDefault();
          if (ev.dataTransfer) {
            ev.dataTransfer.dropEffect = 'move';
          }
        }
      " dropzone="true" @drop="
  (ev) => {
    ev.preventDefault();
    drop(item);
  }
" @click="() => select(item)" class="inst" v-for="item in instruments" :key="item.id" :model="{ headers, item }"
                                  :class="{ activeRow: selected && selected.id == item.id }">
        <template #item.actions>
          <div class="text-no-wrap">
            <ada-icon class="tw-m-0 tw-p-0 tw-mx-2" :class="[canFocus ? 'tw-text-info' : '']"
                      @click.stop.prevent="() => focus(item)" :disabled="!canFocus" :size="16">
              isax-eye
            </ada-icon>
            <ada-icon :class="[
              'tw-m-0 tw-p-0',
              (item.status & 3) != 3 ? null : 'tw-text-success',
            ]" @click.stop.prevent="() => order(item, Side.Buy)" :disabled="(item.status & 3) != 3" :size="16">
              isax-bag-tick-2
            </ada-icon>
            <ada-icon :class="[
              'tw-m-0 tw-p-0 tw-mx-2',
              (item.status & 3) != 3 ? null : 'tw-text-error',
            ]" @click.stop="() => order(item, Side.Sell)" :disabled="(item.status & 3) != 3" :size="16">
              isax-bag-cross-1
            </ada-icon>
          </div>
        </template>
        <template #item.name>
          <ada-badge :class="[
            (item.status & 1) != 1
              ? 'error'
              : (item.status & 6) != 6
                ? 'warning'
                : 'success',
          ]" dot>
            <ada-tooltip position="right">
              <template #activator>
                <span style="line-height: 2.5" class="tw-block">
                  {{ item.name }}
                </span>
              </template>
              {{ $t(parseStatus(item.status)) }}
            </ada-tooltip>
          </ada-badge>
        </template>
        <template #item.wealth>
          <numeric-field :value="item.amount"/>
        </template>
        <template #item.flow>
                    <span>
                        {{ $t("instrument.flows." + item.flow) }}
                    </span>
        </template>
        <template #item.market>
                    <span>
                        {{ $t("instrument.markets." + item.market) }}
                    </span>
        </template>
        <template #item.opening>
          <numeric-field :value="item.opening"/>
        </template>
        <template #item.closing>
          <numeric-field :value="item.closing"
                         :class="item.closing < item.yesterdayPrice ? 'tw-text-error' : 'tw-text-success'"/>
        </template>
        <template #item.last>
          <numeric-field :value="item.last"
                         :class="item.last < item.yesterdayPrice ? 'tw-text-error' : 'tw-text-success'"/>
        </template>
        <template #item.yesterdayPrice>
          <numeric-field :value="item.yesterdayPrice"/>
        </template>
        <template #item.lowest>
          <numeric-field :value="item.lowest"/>
        </template>
        <template #item.highest>
          <numeric-field :value="item.highest"/>
        </template>
        <template #item.totalTrades>
          <numeric-field :value="item.totalTrades"/>
        </template>
        <template #item.totalShares>
          <numeric-field :value="item.totalShares"/>
        </template>
        <template #item.totalTradesValue>
          <numeric-field :value="item.totalTradesValue"/>
        </template>
        <template #item.status>
          <span>
            {{ $t("instrument.state." + item.status) }}
          </span>
        </template>
        <template #item.type>
          <span>
            {{ $t("instrument.types." + item.type) }}
          </span>
        </template>
        <template #item.more>
          <ada-icon class="tw-text-error" @click.self.stop.prevent="removeWatchList(item)" :size="16">
            isax-trash
          </ada-icon>
        </template>
        <template #item.notifications>
          <dashboard-watch-list-instrument-notifications :value="item"/>
        </template>
      </ada-data-table-row-handler>
    </ada-data-table>
    <lazy-ada-dialog :active="confirmInstrumentRemoval">
      <div class="dialog-delete">
        <h5 v-text="$t('general.alert')"></h5>
        <p v-text="$t('instrument.remove')"></p>
        <footer class="tw-flex tw-items-center tw-p-2">
          <ada-btn dark :width="65" @click.stop.prevent="
            () => {
              remove(itemToDelete);
              confirmInstrumentRemoval = false;
            }
          ">
            {{ $t("general.yes") }}
          </ada-btn>
          <ada-btn dark :width="65" @click.stop.prevent="
            () => {
              itemToDelete = null;
              confirmInstrumentRemoval = false;
            }
          ">
            {{ $t("general.no") }}
          </ada-btn>
        </footer>
      </div>
    </lazy-ada-dialog>
  </div>
</template>
