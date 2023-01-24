import { defineStore } from "pinia";
import { TabItem } from "@/types";
import defaultTabs from "@/components/bottom-panel/tabs";
import { getMenuItems } from "@/components/rightPanel/items";

export const useBottomPanel = defineStore("bottom-panel", () => {
  const router = useRouter();
  const route = useRoute();

  const state = reactive({
    _expanded: false,
    _tabs: <{ [key: string]: TabItem }>{},
    _loading: false,
    showFinancInfo: true,
    leftPanelMini: false,
  });

  registerTabs();

  const tabs = computed(() => Object.values(state._tabs));
  const LeftPanelMini = computed({
    get: () => state.leftPanelMini,
    set(val) {
      state.leftPanelMini = val;
    },
  });
  const expanded = computed(() => state._expanded);
  const loading = computed(() => state._loading);

  function registerTab(tab: TabItem) {
    state._tabs[tab.id ?? ""] = tab;
  }

  function toggleExpand() {
    state._expanded = !state._expanded;
  }

  function setLoading(payload: boolean) {
    state._loading = payload;
  }

  function removeTab(id: string | number): void {
    if (state._tabs[id]) {
      state._tabs[id].const = false;
      router.push(`/watchlist/${route.params.name}`);
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
      const: false,
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
    getTitle,
    tabs,
    expanded,
    loading,
    LeftPanelMini,
  };
});
