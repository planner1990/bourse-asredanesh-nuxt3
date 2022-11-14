import { defineStore } from "pinia";
import { DeepOptions, TabItem, Message } from "@/types";
import { WritableComputedRef, Ref, watch } from "vue";
import defaultTabs from "@/components/bottom-panel/tabs";
import { getMenuItems } from "@/components/rightPanel/items";
import { useMessages } from '~~/composables';

export const useBottomPanel = defineStore("bottom-panel", () => {
  const router = useRouter();
  const route = useRoute();
  const messageManager = useMessages()

  const state = reactive({
    _activeTab: null as TabItem | null,
    _expanded: false,
    _tabs: <{ [key: string]: TabItem }>{},
    _market_depth: <null | { tab: DeepOptions; data: any }>null,
    _loading: false,
    _optionTab: <null | TabItem>null,

  });

  registerTabs()

  const tabs = computed(() => Object.values(state._tabs));

  const activeTab: WritableComputedRef<TabItem | null> = computed({
    set(val: TabItem) {
      if (state._optionTab != null && val?.deletable) {
        state._optionTab.const = false;
      }
      if (val?.deletable) {
        state._optionTab = val;
      }
      const tab = state._tabs[val?.id]
      if (tab) { tab.const = true; state._activeTab = tab }
      else { state._activeTab = null }
    },
    get() {
      return state._activeTab ?? null
    },
  });

  const expanded = computed(() => state._expanded);
  const loading = computed(() => state._loading);

  function registerTab(tab: TabItem) {
    state._tabs[tab.id] = tab;
  }
  function toggleExpand() {
    state._expanded = !state._expanded;
  }
  function setLoading(payload: boolean) {
    state._loading = payload;
  }
  function removeTab(id: string | number): void {
    if (state._tabs[id]) {
      state._tabs[id].const = false
      state._activeTab = null
      router.push(`/watchlist/${route.params.name}`)
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
      match: /^\/watchlist\/.+\/messages\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
      children: [
        {
          path: "messages/1",
          title: "menu.message",
          secondTitle: "",
          deletable: false,
          match: /^\/watchlist\/.+\/messages\/[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,

        },
      ],
      path: "messages/1",
      deletable: true,
      const: false
    }

    registerTab(tabMessage as TabItem)
  }

  watch(()=> messageManager.message_active, (newVal)=> {
    const tab = state._tabs['messages']
    tab.title = getTitle(newVal.origin)
    tab.path = `messages/${ newVal.id }`
    tab.children[0].title = getTitle(newVal.origin)
    tab.children[0].secondTitle = newVal.title
    tab.children[0].path = `messages/${ newVal.id }`
  })

  function getTitle (type: number) {
    if (type == 1) {
      return "categories.marketModerator";
    } else if (type == 4) {
      return "categories.tedan";
    } else if (type == 5) {
      return "categories.codal";
    } else {
      return "categories.news";
    }
  };



  return {
    state,
    registerTab,
    setLoading,
    toggleExpand,
    removeTab,
    getTitle,
    tabs,
    activeTab,
    expanded,
    loading,
  };
});
