import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Instrument, OrderQueueItem, Side, ActiveInstrument, SameSectorQuery, InstrumentCache, MarketHistory } from '@/types'
import { getInstrumentsDetail, getOrderQueue, getTeammates, getInstrumentMarketHistory } from '@/repositories/oms/instruments_manager'


export const state = () => (new RootState())

export class RootState {
  cache: Map<string, InstrumentCache> = new Map<string, InstrumentCache>()
  focus: Array<InstrumentCache> = []
  selected: ActiveInstrument = new ActiveInstrument(0, Side.Buy)
  orderQueueCache: Map<string, Array<OrderQueueItem>> = new Map<string, Array<OrderQueueItem>>()
}

export const getters: GetterTree<RootState, RootState> = {
  getAll: (state) => (ids: Array<string>): Array<InstrumentCache> => {
    const res: Array<InstrumentCache> = []
    for (let id in ids) {
      const tmp = state.cache.get(ids[id]) as InstrumentCache
      if (tmp)
        res.push(tmp)
    }
    return res
  },
  getByKey: (state) => (key: number): InstrumentCache | null => {
    return state.cache.get(key.toString()) || null
  },
  getFocus: (state): Array<InstrumentCache> => {
    return state.focus
  },
  getSelected: (state): ActiveInstrument => {
    return state.selected
  },
  getSelectedIndex: (state): number => {
    return state.focus.findIndex((item) => item.id == state.selected.instrumentId)
  }
}

export const mutations: MutationTree<RootState> = {
  setInstruments(state, data: Array<InstrumentCache>) {
    for (let i in data) {
      state.cache.set(data[i].id.toString(), data[i])
    }
  },
  setFocus(state, data: Array<InstrumentCache>) {
    state.focus = data
  },
  removeFocus(state, data: number) {
    state.focus.splice(state.focus.findIndex((element: Instrument) => element.id == data), 1)
  },
  watchQueue(state, payload: { key: number, data: Array<OrderQueueItem> }) {
    state.orderQueueCache.set(payload.key.toString(), payload.data)
  },
  stopWatchQueue(state, key: number) {
    state.orderQueueCache.delete(key.toString())
  },
  select(state, active: ActiveInstrument) {
    active.side = active.side ?? state.selected.side
    state.selected = active
  },
  selectByIndex(state, index: number) {
    state.selected.instrumentId = state.focus[index]?.id
  },
  selectSide(state, side: Side) {
    state.selected.side = side
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async getInstrumentsDetail({ state, commit }, payload: Array<number>): Promise<Array<InstrumentCache> | number> {
    try {
      let res: Array<InstrumentCache> = []
      let missing: Array<number> = []
      let tmp = null
      for (let i in payload) {
        tmp = state.cache.get(payload[i].toString())
        if (tmp && tmp.baseVol) res.push(tmp)
        else missing.push(payload[i])
      }
      if (missing.length > 0) {
        const getins = getInstrumentsDetail(missing, this.$axios)
        const { data: { data: market } } = await getInstrumentMarketHistory(missing, this.$axios)
        const { data: { data } } = await getins
        res.push(...data.map(
          (ins) => Object.assign(market.find((item) => item.instrumentId == ins.id), ins)))
        commit('setInstruments', res)
      }
      return res
    } catch (err: any) {
      if (err.response) {
        return err.response.status as number
      }
      return 450
    }
  },
  async getOrderQueue({ state, commit }, payload: number): Promise<Array<OrderQueueItem> | number> {
    try {
      let queue = state.orderQueueCache.get(payload.toString())
      if (queue)
        return queue
      const { data } = await getOrderQueue(payload, this.$axios)
      commit('watchQueue', { key: payload, data: data })
      return data
    } catch (err: any) {
      if (err.response) {
        return err.response.status as number
      }
      return 450
    }
  },
  async getTeammates({ state, commit }, payload: SameSectorQuery): Promise<Array<OrderQueueItem> | number> {
    try {
      const { data } = await getTeammates(payload.instrument, payload.sector, this.$axios)
      return data
    } catch (err: any) {
      if (err.response) {
        return err.response.status as number
      }
      return 450
    }
  }
}
