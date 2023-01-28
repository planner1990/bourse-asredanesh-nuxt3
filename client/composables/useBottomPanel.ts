import { defineStore } from "pinia";
import { TabItem } from "@/types";
import defaultTabs from "@/components/bottom-panel/tabs";
import { getMenuItems } from "@/components/rightPanel/items";

export const useBottomPanel = defineStore("bottom-panel", () => {
  const router = useRouter();
  const route = useRoute();

  const state = ref({
    _expanded: false,
    _tabs: <{ [key: string]: TabItem }>{},
    _loading: false,
    showFinancialInfo: true,
    leftPanelMini: false,
  });

  registerTabs();

  const tabs = computed(() => Object.values(state.value._tabs));
  const LeftPanelMini = computed({
    get: () => state.value.leftPanelMini,
    set(val) {
      state.value.leftPanelMini = val;
    },
  });
  const expanded = computed(() => state.value._expanded);
  const loading = computed(() => state.value._loading);

  function registerTab(tab: TabItem) {
    state.value._tabs[tab.id ?? ""] = tab;
  }

  function toggleExpand() {
    state.value._expanded = !state.value._expanded;
  }

  function setLoading(payload: boolean) {
    state.value._loading = payload;
  }

  function removeTab(id: string | number): void {
    if (state.value._tabs[id]) {
      state.value._tabs[id].const = false;
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
