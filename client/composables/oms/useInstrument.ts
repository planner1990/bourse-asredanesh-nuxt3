import { computed, nextTick, reactive, ref, Ref } from "#app";
import { defineStore } from "pinia";
import { InstrumentState } from "@/types/stores";
import {
  ClientDistribution,
  DailyPrice,
  Instrument,
  InstrumentCache,
  InstrumentSearchModel,
  MarketHistory,
  OrderQueueItem,
  SameSectorQuery,
  Wealth,
} from "~/types";
import manager from "@/repositories/oms/instruments_manager";
import { useAxios } from "../useAxios";
import { useWebSocket } from "../useWebsocket";
import { object } from "yup";
import { Side } from "@/types";

export const useInstrument = defineStore("instrument", () => {
  const state = ref<InstrumentState>({
    cache: new Map<string, InstrumentCache>(),
    focus: reactive([]),
    focusViewMode: 0,
    selected: null,
    activeTab: null,
    orderQueueCache: {},
    clientDistributionCache: {},
    width: process.client ? window.screen.availWidth : 800,
  });
  const axiosManager = useAxios();
  const axios = axiosManager.createInstance();

  const websocket = useWebSocket();

  websocket.registerHandler("TSE_UPDATE", (data) => {
    const inst = state.value.cache.get(data.obj.tid.toString());
    if (inst) {
      inst.lastTradeDate = data.obj.lastTradeDate;
      if (data.obj.legalReal) {
        state.value.clientDistributionCache[data.obj.tid] = data.obj.legalReal;
      }
      if (data.obj.price) {
        inst.last = data.obj.price.last;
        inst.opening = data.obj.price.opening;
        inst.closing = data.obj.price.closing;
        inst.lowest = data.obj.price.lowest;
        inst.highest = data.obj.price.highest;
        inst.yesterdayPrice = data.obj.price.yesterdayPrice;
      }
      if (data.obj.market) {
        inst.totalShares = data.obj.market.totalShares;
        inst.totalTrades = data.obj.market.totalTrades;
        inst.totalTradesValue = data.obj.market.totalTradesValue;
      }
    }
    if (data.obj.queue) {
      if (state.value.orderQueueCache[data.obj.id]) {
        state.value.orderQueueCache[data.obj.id].splice(
          0,
          data.obj.queue.length,
          ...data.obj.queue
        );
      } else state.value.orderQueueCache[data.obj.id] = data.obj.queue;
    }
  });

  // Getters
  const width = computed({
    get(): number {
      return state.value.width;
    },
    set(data: number) {
      setWidth(data);
    },
  });
  const focusMode = computed(() => state.value.focusViewMode);
  const getByKey = computed(
    () =>
      (key: number): InstrumentCache | null =>
        state.value.cache.get(key.toString()) || null
  );
  const getFocus = computed((): Array<InstrumentCache> => state.value.focus);
  const getActive = computed(
    (): InstrumentCache | null => state.value.activeTab
  );
  const getSelectedIndex = computed((): number =>
    state.value.focus.findIndex((item) => item.id == state.value.selected?.id)
  );

  // Mutations
  function updateInstrument(
    data: InstrumentCache | Instrument | DailyPrice | MarketHistory | Wealth
  ) {
    const inst = state.value.cache.get(data.id.toString());
    if (inst) Object.assign(inst, data);
    else
      state.value.cache.set(
        data.id.toString(),
        Object.assign(new InstrumentCache(), data)
      );
  }
  function setFocus(data: Array<InstrumentCache>) {
    state.value.focus = data;
  }
  function addFocus(data: InstrumentCache) {
    if (state.value.focus.findIndex((item) => item.id == data.id) == -1)
      state.value.focus.splice(0, 0, data);
  }
  function setFocusMode(data: number) {
    state.value.focusViewMode = data;
  }
  function removeFocus(data: number) {
    const index = state.value.focus.findIndex(
      (element: Instrument) => element.id == data
    );
    state.value.focus.splice(index, 1);
    state.value.activeTab =
      index >= state.value.focus.length
        ? state.value.focus[index - 1]
        : state.value.focus[index];
  }
  function select(active: InstrumentCache | null) {
    state.value.selected = active;
  }
  function activateTab(inst: InstrumentCache | null) {
    state.value.activeTab = inst;
  }
  function setWidth(width: number) {
    state.value.width = width;
  }

  async function getInstrumentsDetail(
    searchModel: InstrumentSearchModel
  ): Promise<Array<InstrumentCache>> {
    const res: Array<InstrumentCache> = [];
    const missing: Array<number> = [];

    if (
      searchModel.boardIds.length == 0 &&
      searchModel.secIds.length == 0 &&
      searchModel.ids.length != 0
    ) {
      let tmp = null;
      for (let i in searchModel.ids) {
        tmp = state.value.cache.get(searchModel.ids[i].toString());
        if (tmp?.name) res.push(tmp);
        else missing.push(searchModel.ids[i]);
      }
    }

    if (
      missing.length > 0 ||
      searchModel.boardIds.length > 0 ||
      searchModel.secIds.length > 0
    ) {
      const {
        data: { data },
      } = await manager.getInstruments(
        Object.assign({}, searchModel, { ids: missing }),
        axios
      );
      data.forEach((item) => {
        updateInstrument(item);
        websocket.addInstrumentToWatch(item);
        res.push(state.value.cache.get(item.id.toString()) as InstrumentCache);
      });
    }

    res.sort((a, b) => {
      return searchModel.ids.indexOf(a.id) - searchModel.ids.indexOf(b.id);
    });
    websocket.watchInstruments(null);
    const ids = res.map((item) => item.id);
    if (ids.length > 0) {
      getInstrumentPrices(ids);
      getMarketHistory(ids);
    }

    return res;
  }
  async function getInstrumentPrices(
    ids: Array<number>
  ): Promise<Array<DailyPrice> | number> {
    const {
      data: { data },
    } = await manager.getDailyPrice(ids, axios);
    data.forEach((item) => {
      item.id = item.instrumentId;
      updateInstrument(item);
    });
    return data;
  }
  async function getMarketHistory(
    ids: Array<number>
  ): Promise<Array<MarketHistory> | number> {
    const {
      data: { data },
    } = await manager.getInstrumentMarketHistory(ids, axios);
    data.forEach((item) => {
      item.id = item.instrumentId;
      updateInstrument(item);
    });
    return data;
  }
  function getOrderQueue(
    inst: Instrument | InstrumentCache
  ): Array<OrderQueueItem> {
    let queue = state.value.orderQueueCache[inst.instrumentCode];
    if (queue) return queue;
    else {
      state.value.orderQueueCache[inst.instrumentCode] = reactive([
        new OrderQueueItem(),
        new OrderQueueItem(),
        new OrderQueueItem(),
        new OrderQueueItem(),
        new OrderQueueItem(),
      ]);
      manager.getOrderQueue(inst.id, axios).then((resp) => {
        if (resp.data.queue)
          state.value.orderQueueCache[inst.instrumentCode].splice(
            0,
            resp.data.queue.length,
            ...resp.data.queue
          );
      });
    }
    return state.value.orderQueueCache[inst.instrumentCode];
  }
  function getClientDistribution(id: number): ClientDistribution {
    let clients = state.value.clientDistributionCache[id.toString()];
    if (clients) return clients;
    else {
      state.value.clientDistributionCache[id.toString()] =
        new ClientDistribution();
      manager.getClientDistribution(id, axios).then((resp) => {
        state.value.clientDistributionCache[id.toString()] = resp.data.clients;
      });
    }
    return state.value.clientDistributionCache[id.toString()];
  }
  async function getTeammates(
    searchModel: SameSectorQuery
  ): Promise<{ queue: Array<OrderQueueItem> }> {
    const { data } = await manager.getTeammates(
      searchModel.instrument,
      searchModel.sector,
      axios
    );
    return data;
  }

  function focusOnCount(id: number) {
    nextTick(() => {
      setTimeout(() => {
        if (id == Side.Sell) {
          document.getElementById("sellCountInputText")!.focus();
        }
        if (id == Side.Buy) {
          document.getElementById("buyCountInputText")!.focus();
        }
      }, 500);
    });
  }



  return {
    state,
    // Getters
    width,
    focusMode,
    getByKey,
    getFocus,
    getActive,
    getSelectedIndex,
    //Mutations
    updateInstrument,
    setFocus,
    addFocus,
    setFocusMode,
    removeFocus,
    select,
    activateTab,
    setWidth,
    // Actions
    getInstrumentsDetail,
    getInstrumentPrices,
    getMarketHistory,
    getOrderQueue,
    getClientDistribution,
    getTeammates,
    focusOnCount
  };
});
