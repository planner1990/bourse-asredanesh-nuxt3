<script setup lang="ts">
import {
  PaginatedResult,
  Message,
  MessageQuery,
  TabItem,
  MenuItem, InstrumentCache, InstrumentSearchModel, Side,
} from "@/types";
import {
  useAsrTrader,
  useBottomPanel,
  useMessages,
  useInstrument, useOrder,
} from "~/composables";

const emit = defineEmits(["openWatchList", "update:modelValue", "update:mini"]);
const props = defineProps<{ modelValue: boolean; clipped: boolean }>();
const messageManager = useMessages();
const appManager = useAsrTrader();
const instrumentManager = useInstrument();
const bottomPanel = useBottomPanel();
const locale = appManager.locale;
const toggleMenu = ref<null | string>(null);
const router = useRouter()
const route = useRoute()
const orderManager = useOrder();

const drawer = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

const loading = ref(false);

const messages = reactive<Message[]>([]);

const origins = messageManager.state.origins;

const selected = computed(() => instrumentManager.state.selected);

const mini = computed({
  get() {
    return bottomPanel.LeftPanelMini;
  },
  set(val) {
    bottomPanel.LeftPanelMini = val;
  },
});


const messageQuery = messageManager.state.messageQuery


messageQuery.filters.origins = origins;

const items: Array<MenuItem> = [
  {icon: "", title: "general.me"},
  {icon: "", title: "general.all"},
];
const categories = messageManager.state.categories;

/////

watch(toggleMenu, (newVal) => {
  mini.value = typeof newVal == "undefined" || newVal == null;
});

watch(
    selected,
    (newVal) => {
      if (newVal) {
        messageQuery.filters.title = "(" + newVal?.name;
      } else {
        messageQuery.filters.title = null;
      }
      loadMessages();
    },
    {deep: true}
);

watch(categories, () => {
  loadMessages();
});

function loadMessages() {
  load(messageQuery).then((res) => {
    messages.splice(0, Infinity);
    messages.push(...res);
  });
}

async function load(query: MessageQuery) {
  loading.value = true;
  try {
    const res: PaginatedResult<Message> =
        await messageManager.getMessages(query);
    return res.data;
  } finally {
    loading.value = false;
  }
}

async function trigger_show_message(message: Message) {
  if (message.id == messageManager.message_active?.id) return
  try {
    bottomPanel.setLoading(true);
    const mes = (await messageManager.getMessage(message.id));
    const tab = {
      id: "messages",
      title: bottomPanel.getTitle(mes.origin),
      match: /^\/watchlist\/.+\/messages\?id=[^\/]+([?](.+[=].+[&]?)+)?([\/]{1})?$/g,
      children: [
        {
          id: `msg.${mes.id}`,
          title: bottomPanel.getTitle(mes.origin),
          secondTitle: mes.title,
          deletable: false,
          path: `messages?id=${mes.id}`,
        },
      ],
      path: `messages?id=${mes.id}`,
      show: false,
      deletable: true
    };
    console.log(mes);
    seenMessage(mes)
    bottomPanel.registerTab(tab as TabItem);
    messageManager.message_active = message
    await router.push({path: `/watchlist/${route.params.name}/messages`, query: {id: mes.id}});
  } catch (e) {
    console.log(e);
  } finally {
    bottomPanel.setLoading(false);
  }
}

function seenMessage(message: Message) {
  const res = messages.find((item) => item.id === message.id)
  if (res) {
    res.seenDate = new Date().toLocaleDateString(locale)
  }
}


loadMessages();

// loadMyMessages();
async function focus() {
  const items = await instrumentManager.getInstrumentsDetail(new InstrumentSearchModel([919]))
  instrumentManager.addFocus(items[0]);
  instrumentManager.activateTab(items[0]);
  instrumentManager.setFocusMode(0);
  orderManager.setSide(Side.Buy, String(919));
  instrumentManager.select(items[0])
}
</script>

<style lang="postcss" scoped>
.l-panel {
  font-size: 0.875rem;
  @apply tw-bg-red-600;

  &::after {
    @apply tw-inset-0 tw-absolute tw-w-full tw-h-full;
    z-index: -1;
    background-color: #fff;
    content: "";
    touch-action: none;
    pointer-events: none;
  }

  .toggle.tabs {
    @apply tw-items-center tw-px-2 tw-shadow-[0_2px_3px_1px] tw-shadow-primary/20;
    padding-top: 8px;
    height: calc(100vh - 42px);
    padding-bottom: 9px;
    min-width: 48px;
    width: 48px;
    max-width: 48px;
    flex-basis: 48px;
  }

  .ada-button,
  .ada-tooltip-container :deep(.ada-button) {
    @apply tw-bg-transparent tw-w-10;

    &.active {
      @apply tw-bg-primary tw-bg-opacity-20 tw-text-primary;

      i {
        @apply tw-text-primary;
      }
    }
  }

  .tab-items {
    width: calc(100% - 48px);
    @apply tw-shadow-[0_2px_3px_1px] tw-shadow-primary/20 tw-py-2 tw-overflow-clip;

    & :deep(.ada-button) {
      @apply tw-bg-transparent;
    }

    .categories {
      @apply tw-px-2 tw-mt-1 tw-select-none tw-flex tw-justify-between tw-items-center;

      span {
        @apply tw-inline-block tw-h-8 tw-px-2 tw-mx-1 tw-rounded-xl tw-cursor-pointer tw-font-semibold;
        line-height: 24px;
      }
    }

    .line {
      @apply tw-w-11/12 tw-border-y-gray4 tw-mx-auto;
      border-top-width: 1px;
      margin-top: 5px;
    }

    #messages {
      @apply tw-overflow-x-hidden tw-overflow-y-auto tw-border-b-orange-300;
      height: calc(100vh - 109px);
    }
  }

  .first-offer {
    animation: blink-animation 2s steps(24, start) infinite;

    @keyframes blink-animation {
      0% {
        @apply tw-bg-error tw-text-white;
      }
      50% {
        @apply tw-bg-success tw-text-white;
      }
      100% {
        @apply tw-bg-error tw-text-white;
      }
    }
  }

  .close-btn {
    position: absolute;
    left: -13px;
    bottom: 23px;
    z-index: 99999999;
  }
}
</style>

<template>
  <ada-nav v-model="drawer" min-width="48px" max-width="256px" :mini="mini" mobile-breakpoint="960" fixed
           class="l-panel tw-left-0 tw-flex-row-reverse">
    <ada-toggle class="tabs tw-flex tw-flex-col tw-justify-between" vertical v-model="toggleMenu">
      <ada-list class="tw-pb-1 tw-overflow-visible">
        <ada-list-item v-for="item in items" :key="item.title" :value="item">
          <template #item="{ value }">
            <ada-btn :model="value.title" @click="$emit('update:mini', !mini)">
              <span v-text="$t(value.title)"></span>
            </ada-btn>
          </template>
        </ada-list-item>
        <ada-list-item class="tw-mt-1">
          <template #item>
            <div>
              <hr class="divider"/>
            </div>
          </template>
        </ada-list-item>
      </ada-list>
      <ada-tooltip position="right">
        <template #activator>
          <ada-btn :width="30" :height="30" class="tw-ml-2" @click="focus">
            <ada-icon size="21px" class="first-offer tw-rounded-full tw-p-[7px]">
              mdi-application-cog
            </ada-icon>
          </ada-btn>
        </template>
        <span v-text="$t('oms.openingTrade')"></span>
      </ada-tooltip>
    </ada-toggle>
    <ada-tabs class="tab-items" v-model="toggleMenu">
      <div class="categories">
                <span v-for="category in categories" :key="category.title" :class="[
                    `${category.active ? category.bg + ' ' + category.color : ''}`,
                ]" v-text="$t(category.title)" @click="
    () => {
        category.active = !category.active;
        if (category.active) origins.push(category.code);
        else origins.splice(origins.indexOf(category.code), 1);
        // loadMyMessages();
        loadMessages();
    }
"></span>
      </div>
      <div id="messages">
        <div v-for="message in messages" :key="message.id">
          <hr class="line"/>
          <LeftPanelMessageItem :id="message.id" :dateTime="message.dateTime" :title="message.title"
                                :preview="message.preview" :origin="message.origin" :type="message.origin"
                                :flags="message.flags"
                                :message="message.message.body" :seenDate="message.seenDate" style="height: 60px"
                                @triggerShowMessage="trigger_show_message"/>
        </div>
      </div>
      <ada-btn class="tw-ml-6 tw-min-w-[70px] tw-text-lg tw-text-error close-btn"
               @click="$emit('update:mini', !mini)">
        <ada-icon :size="18" class="tw-text-error">mdi-close</ada-icon>
        بستن
      </ada-btn>
    </ada-tabs>
  </ada-nav>
</template>