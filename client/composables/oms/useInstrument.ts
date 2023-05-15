import {defineStore} from "pinia";
import {decode} from "@msgpack/msgpack";
import {InstrumentState} from "@/types/stores";
import {
    ClientDistribution,
    DailyPrice,
    Instrument,
    InstrumentCache,
    InstrumentSearchModel,
    MarketHistory,
    OrderQueueItem,
    SameSectorQuery,
    TradesHistory,
    TradesHistorySerachModel,
    PaginatedResult,
    Wealth,
    SearchModel,
} from "~/types";
import manager from "@/repositories/oms/instruments_manager";
import {useAxios} from "..";
import {useWebSocket} from "~/composables";

export const useInstrument = defineStore("instrument", () => {
    const state = ref<InstrumentState>({
        cache: reactive({}),
        idCache: reactive({}),
        focus: reactive([]),
        focusViewMode: 0,
        selected: null,
        activeTab: null,
        orderQueueCache: reactive({}),
        clientDistributionCache: reactive({}),
        width: process.client ? window.screen.availWidth : 800,
    });
    const axiosManager = useAxios();
    const axios = axiosManager.createInstance();

    const websocket = useWebSocket();

    websocket.registerHandler("price", (data) => {
        const inst = state.value.cache[data.referenceNumber];
        const parsedData = data.obj ? (decode(data.obj) as any) : {};
        if (typeof inst != "undefined") {
            inst.lastTradeDate = parsedData.dateTime;
            inst.last = parsedData.last;
            inst.opening = parsedData.opening;
            inst.closing = parsedData.closing;
            inst.lowest = parsedData.lowest;
            inst.highest = parsedData.highest;
            inst.yesterdayPrice = parsedData.yesterdayPrice;
        }
    });

    websocket.registerHandler("market", (data) => {
        const inst = state.value.cache[data.referenceNumber];
        const parsedData = data.obj ? (decode(data.obj) as any) : {};
        if (inst) {
            inst.totalShares = parsedData.totalShares;
            inst.totalTrades = parsedData.totalTrades;
            inst.totalTradesValue = parsedData.totalTradesValue;
        }
    });

    websocket.registerHandler("queue", (data) => {
        const inst = state.value.orderQueueCache[data.referenceNumber];
        const parsedData = data.obj ? (decode(data.obj) as any) : {};
        if (typeof inst != "undefined") {
            state.value.orderQueueCache[data.referenceNumber].splice(
                0,
                parsedData.length,
                ...parsedData
            );
        } else state.value.orderQueueCache[data.referenceNumber] = parsedData;
    });

    websocket.registerHandler("legal-real", (data) => {
        const parsedData = data.obj ? (decode(data.obj) as any) : {};
        if (typeof state.value.clientDistributionCache[data.referenceNumber] === "undefined") {
            state.value.clientDistributionCache[data.referenceNumber] = new ClientDistribution()
        }
        Object.assign(
            state.value.clientDistributionCache[data.referenceNumber],
            parsedData
        );

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

    const getFocus = computed((): Array<InstrumentCache> => state.value.focus);
    const getActive = computed(
        (): InstrumentCache | null => state.value.activeTab
    );
    const getSelected = computed(() => state.value.selected);
    const getSelectedIndex = computed((): number =>
        state.value.focus.findIndex((item) => item.id == state.value.selected?.id)
    );

    // Mutations
    function updateInstrumentById(
        data: InstrumentCache | Instrument | DailyPrice | MarketHistory | Wealth
    ) {
        const inst = state.value.idCache[data.id];
        if (inst) Object.assign(inst, data);
        else {
            state.value.idCache[data.id] = Object.assign(new InstrumentCache(), data);
        }
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
        const index = state.value.focus.findIndex((element) =>
            element.id == data ? element : false
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
                tmp = state.value.idCache[searchModel.ids[i]];
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
                data: {data},
            } = await manager.getInstruments(
                Object.assign({}, searchModel, {ids: missing}),
                axios
            );
            data.forEach((item) => {
                state.value.cache[item.instrumentCode] = Object.assign(
                    new InstrumentCache(),
                    state.value.idCache[item.id],
                    item,
                    state.value.cache[item.instrumentCode]
                );
                state.value.idCache[item.id] = state.value.cache[item.instrumentCode];
                res.push(state.value.idCache[item.id]);
            });
        }
        res.sort((a, b) => {
            return searchModel.ids.indexOf(a.id) - searchModel.ids.indexOf(b.id);
        });

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
            data: {data},
        } = await manager.getDailyPrice(ids, axios);
        data.forEach((item) => {
            item.id = item.instrumentId;
            updateInstrumentById(item);
        });
        return data;
    }

    async function getDailyPrices(
        id: number,
        searchModel: SearchModel
    ): Promise<Array<DailyPrice>> {
        const {
            data: {data},
        } = await manager.getInstrumentDailyPrice(id, searchModel, axios);
        return data;
    }

    async function getMarketHistory(
        ids: Array<number>
    ): Promise<Array<MarketHistory> | number> {
        const {
            data: {data},
        } = await manager.getInstrumentMarketHistory(ids, axios);
        data.forEach((item) => {
            item.id = item.instrumentId;
            updateInstrumentById(item);
        });
        return data;
    }

    function getOrderQueue(
        inst: Instrument | InstrumentCache
    ): Array<OrderQueueItem> {
        const queue = state.value.orderQueueCache[inst.instrumentCode];
        if (typeof queue == "undefined") {
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
                state.value.clientDistributionCache[id.toString()] =
                    resp.data.clients || new ClientDistribution();
            });
        }
        return state.value.clientDistributionCache[id.toString()];
    }

    async function getTeammates(
        searchModel: SameSectorQuery
    ): Promise<PaginatedResult<number>> {
        const {data} = await manager.getTeammates(
            searchModel.instrument,
            searchModel.sector,
            axios
        );
        return data;
    }

    async function getTradeHistories(
        searchModel: TradesHistorySerachModel
    ): Promise<PaginatedResult<TradesHistory>> {
        const {data} = await manager.getTradeHistories(searchModel, axios);
        return data;
    }

    async function getMyGroups(
        searchModel: InstrumentSearchModel
    ): Promise<PaginatedResult<Instrument> | undefined> {
        try {
            const {data} = await manager.getInstruments(searchModel, axios);
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    return {
        state,
        // Getters
        width,
        focusMode,
        getFocus,
        getActive,
        getSelected,
        getSelectedIndex,
        //Mutations
        updateInstrumentById,
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
        getDailyPrices,
        getMarketHistory,
        getOrderQueue,
        getClientDistribution,
        getTeammates,
        getTradeHistories,
        getMyGroups,
    };
});