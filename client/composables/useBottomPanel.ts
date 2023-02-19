import { defineStore } from "pinia";
import { TabItem } from "@/types";
import defaultTabs from "@/components/bottom-panel/tabs";
import { getMenuItems } from "@/components/rightPanel/items";
import { it } from "node:test";

export const useBottomPanel = defineStore("bottom-panel", () => {
  const state = ref({
    _expanded: false,
    _tabs: <{ [key: string]: TabItem }>{},
    _loading: false,
    showFinancialInfo: true,
    leftPanelMini: false,
  });

  registerTabs();

  const tabs = computed(() => Object.values(state.value._tabs));
  const _current = ref<TabItem | null>(null);
  const current = computed<TabItem | null>({
    get() {
      return _current.value;
    },
    set(tab) {
      if (tab != null && tab.deletable) {
        showTab(tab?.id);
        for (var ta in state.value._tabs) {
          var item = state.value._tabs[ta];
          if (item.deletable && item.id != tab.id) item.show = false;
        }
        if (_current.value != null && _current.value.deletable)
          removeTab(_current.value.id);
      }
      _current.value = tab;
    },
  });
  const LeftPanelMini = computed({
    get: () => state.value.leftPanelMini,
    set(val) {
      state.value.leftPanelMini = val;
    },
  });
  const expanded = computed(() => state.value._expanded);
  const loading = computed(() => state.value._loading);

  function registerTab(tab: TabItem) {
    state.value._tabs[tab.id] = tab;
  }

  function toggleExpand() {
    state.value._expanded = !state.value._expanded;
  }

  function setLoading(payload: boolean) {
    state.value._loading = payload;
  }

  function showTab(id: string | number): void {
    if (state.value._tabs[id]) {
      state.value._tabs[id].show = true;
    }
  }

  function removeTab(id: string | number): void {
    if (state.value._tabs[id]) {
      state.value._tabs[id].show = false;
    }
  }

  function registerTabs() {
    for (let i in defaultTabs) {
      registerTab((defaultTabs as Array<TabItem>)[i]);
    }
    for (let i in getMenuItems()) {
      registerTab((getMenuItems() as Array<TabItem>)[i]);
    }

    const tabMessage = {
      id: "messages",
      title: "menu.message",
      match:
        /^\/watchlist\/.+\/messages\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
      children: [
        {
          path: "messages/1",
          title: "menu.message",
          secondTitle: "",
          deletable: false,
          match:
            /^\/watchlist\/.+\/messages\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
        },
      ],
      path: "messages/1",
      deletable: true,
      show: false,
    };

    registerTab(tabMessage as TabItem);
  }

  function getTitle(type: number) {
    if (type == 1) {
      return "categories.marketModerator";
    } else if (type == 4) {
      return "categories.tedan";
    } else if (type == 5) {
      return "categories.codal";
    } else {
      return "categories.news";
    }
  }

  return {
    state,
    registerTab,
    setLoading,
    toggleExpand,
    removeTab,
    showTab,
    getTitle,
    tabs,
    expanded,
    loading,
    LeftPanelMini,
    current,
  };
});
