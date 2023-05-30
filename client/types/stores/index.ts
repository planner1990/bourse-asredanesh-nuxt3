import { User, AnonymousUser, InstrumentCache, Notification } from "@/types/";
import { ClientDistribution, OrderQueueItem } from "../wealth";

export interface RootState {
  locale: string;
  menu: string | number | null;
}

// User

export const refreshKey: string = "jwtRefreshKey";
export const tokenKey: string = "jwtKey";
export const uuidKey: any = "uuid";
export const userKey: string = "userCache";

export class UserState {
  tryCount: number;
  token: string | null;
  user: User;
  refresh: string | null;
  userName: string | null;
  renewToken: boolean;
  settingsChanged: { [key: string]: any };
  lastWatchlist: boolean;

  constructor() {
    this.tryCount = 0;
    this.token = null;
    this.user = AnonymousUser();
    this.refresh = null;
    this.userName = null;
    this.renewToken = false;
    this.settingsChanged = {};
    this.lastWatchlist = false;
  }

  toJSON() {
    return { ...this };
  }
}

// Instrument

export interface InstrumentState {
  cache: { [key: string]: InstrumentCache };
  idCache: { [key: number]: InstrumentCache };
  focus: Array<InstrumentCache>;
  focusViewMode: number;
  selected: InstrumentCache | null;
  activeTab: InstrumentCache | null;
  orderQueueCache: { [key: string]: Array<OrderQueueItem> };
  clientDistributionCache: { [key: string]: ClientDistribution };
  width: number;
  isShowBuyAndSellFlag?: string
}

export interface Snack {
  content: string;
  color?: string;
  timeout: number;
  bg?: string;
}

export interface Menu {
  active: boolean;
  left: string;
  top: string;
  content: any;
}

export interface SnackState {
  Snacks: Array<Snack>;
}

export interface NotificationState {
  cache: { [key: string]: Array<Notification> };
}

export interface CompanyState {
  cache: { [key: string]: Array<Notification> };
  selected: InstrumentCache | null;
}

export interface OrderQueState {
  amount: number,
  totalVolume: number
}