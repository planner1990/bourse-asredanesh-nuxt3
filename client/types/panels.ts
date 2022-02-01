import { ComputedRef } from '@nuxtjs/composition-api'

export enum BookmarkPosition {
  ToolBar = 1,
  RightPanel = 2
}
export class MenuItem {
  icon: string
  title: string
  text?: string
  color?: string
  to?: string
  children?: Array<MenuItem> | ComputedRef<Array<MenuItem>>
  bookmarkPosition?: BookmarkPosition | null = null
  click?: Function
  constructor(icon: string, title: string) {
    this.icon = icon
    this.title = title
  }
}

export type Bookmark = {
  title: string,
  text: string | undefined,
  to: string,
  icon: string,
  color: string | undefined,
}
export function CreateBookmark(item: MenuItem): Bookmark {
  return { color: item.color, icon: item.icon, text: item.text, title: item.title, to: item.to ?? "#" + item.title }
}

export enum Tabs {
  none = -1,
  activeOrders = 0,
  bests = 1,
  depth = 2,
  furtherInfo = 3,
}

export function TabNames() {
  return [
    new TabTitle(Tabs.activeOrders, "bottom-panel.orders", []),
    new TabTitle(Tabs.bests, "bottom-panel.bests", []),
    new TabTitle(Tabs.depth, "bottom-panel.depth", []),
    new TabTitle(Tabs.furtherInfo, "bottom-panel.more", []),
  ]
}

export enum DeepOptions {
  teammates = "teammates",
  tradeTypes = "tradeTypes",
  shareTypes = "shareTypes",
  holders = "holders",
  tradeHistory = "tradeHistory",
}

export class TabTitle {
  tab: Tabs
  title: string
  params: string[]
  constructor(tab: Tabs, title: string, params: string[] = []) {
    this.tab = tab
    this.title = title
    this.params = params
  }
}
