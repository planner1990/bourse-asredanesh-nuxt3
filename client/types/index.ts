export * from "./collection";
export * from "./message";
export * from "./panels";
export * from "./sso";
export * from "./oms";
export * from "./wealth";
export * from "./accounting";
export * from "./websocket";

import { Instrument, DailyPrice, MarketHistory, Notification } from "./oms";
import { Side, Wealth } from "./wealth";

export interface IInstrumentCache
  extends Instrument,
  DailyPrice,
  MarketHistory,
  Wealth {
  notifications: Array<Notification>;
}

export class InstrumentCache implements IInstrumentCache {
  id: number;
  type: number;
  code: string;
  name: string;
  fullName: string;
  sector: number;
  categoryName: string;
  baseVol: number;
  tradeVal: number;
  settlementDelay: number;
  maxAllowedPrice: number;
  minAllowedPrice: number;
  namedPrice: number;
  buyPrice: number;
  sellPrice: number;
  shares: number;
  company: number;
  companyName: string;
  maxQuantityPerOrder: number;
  minQuantityPerOrder: number;
  issuePrice: number;
  firstTradeDate: string;
  lastTradeDate: string;
  expirationDate: string;
  lastModification: string;
  status: number;
  instrumentCode: string;
  instrumentId: number;
  dateTime: string;
  opening: number;
  closing: number;
  highest: number;
  lowest: number;
  priceChange: number;
  yesterdayPrice: number;
  totalShares: number;
  totalTrades: number;
  totalTradesValue: number;
  amount: number;
  last: number;
  notifications: Array<Notification>;
  market: number;
  flow: number;
  constructor() {
    this.id = 0;
    this.type = 1;
    this.code = "";
    this.name = "";
    this.fullName = "";
    this.sector = 0;
    this.categoryName = "";
    this.baseVol = 0;
    this.tradeVal = 0;
    this.settlementDelay = 0;
    this.maxAllowedPrice = 0;
    this.minAllowedPrice = 0;
    this.namedPrice = 0;
    this.buyPrice = 0;
    this.sellPrice = 0;
    this.shares = 0;
    this.company = 0;
    this.companyName = "";
    this.maxQuantityPerOrder = 0;
    this.minQuantityPerOrder = 0;
    this.issuePrice = 0;
    this.firstTradeDate = "";
    this.lastTradeDate = "";
    this.expirationDate = "";
    this.lastModification = "";
    this.status = 0;
    this.instrumentCode = "";
    this.instrumentId = 0;
    this.dateTime = "";
    this.opening = 0;
    this.closing = 0;
    this.highest = 0;
    this.lowest = 0;
    this.priceChange = 0;
    this.yesterdayPrice = 0;
    this.totalShares = 0;
    this.totalTrades = 0;
    this.totalTradesValue = 0;
    this.amount = 0;
    this.last = 0;
    this.notifications = [];
    this.market = 1;
    this.flow = 1;
  }
}

export type Error = {
  code: number;
  detail: Array<ErrorDetail>;
};

export type ErrorDetail = {
  loc: string;
  type: string;
};
