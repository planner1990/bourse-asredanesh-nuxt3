<script setup lang="ts">
import {useShortcut} from "@/utils/shortcutManager";
import {Bookmark, InstrumentCache} from "~/types";
import {useInstrument, useUser} from "~/composables";
import {object} from "yup";


const instrumentManager = useInstrument();
const userManager = useUser();
const sh = useShortcut();
const route = useRoute();
const toolbar = ref<HTMLElement | null>(null);
const isShowFilterIcon = ref<string | null>(null);
const currentPath = computed(() => route.params.name);

const instruments = computed(() => instrumentManager.getFocus);
const viewMode = computed({
  get() {
    return instrumentManager.focusMode;
  },
  set(val: number) {
    instrumentManager.setFocusMode(val);
  },
});

const selected = computed(() => instrumentManager.state.selected);

watch(selected, () => {
  for (const [key, val] of Object.entries(userManager.watchList)) {
    val.find((v) => {
      if (selected.value?.id) {
        if (v == selected.value?.id) {
          isShowFilterIcon.value = key;
        }
      } else {
        isShowFilterIcon.value = null;
      }
    })
  }
})

function showFilterIcon() {
  for (const [key, val] of Object.entries(userManager.watchList)) {
    val.find((v) => {
      if (v == selected.value?.id) {
        isShowFilterIcon.value = key;
      }
    })
  }
}

showFilterIcon();

async function unmark(bookmark: Bookmark) {
  userManager.getBookmarks.splice(userManager.getBookmarks.findIndex((item) => item.to == bookmark.to), 1);
  await userManager.update_settings({
    path: "/bookmarks",
    value: userManager.getBookmarks,
  });
}

if (process.client) {
  sh.addShortcut({
    key: "alt+q",
    action: () => {
      instrumentManager.setFocusMode((instrumentManager.focusMode + 1) % 2);
    },
  });

  function resize() {
    instrumentManager.setWidth(toolbar.value?.offsetWidth || 800);
  }

  onMounted(() => {
    window.addEventListener("mousemove", resize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", resize);
  });
}
const urlReg = /^\/watchList\/[^\/]+/ig
const bookmarkFullPath = computed(() => (path: string) => {
  return route.fullPath.replace(urlReg, path)
})

function getMatchReg(path: string) {
  return new RegExp(`^${path}[\/]?.*`, "ig")
}

let dragItem: InstrumentCache | null = null;

function drag(item: InstrumentCache) {
  dragItem = item;
}

async function drop(item: InstrumentCache) {
  if (dragItem && dragItem != item) {
  }
  dragItem = null;
}

</script>

<style lang="postcss" scoped>
.focus-board {
  @apply tw-h-[320px] tw-w-full;
}

.toolbar {
  @apply tw-flex tw-flex-grow tw-bg-white/20;
  height: 42px;
  padding: 0 8px 0 8px;
  position: relative;
  align-items: center;
}

.bookmark {
  @apply tw-mx-[4px] tw-px-[4px] tw-rounded tw-bg-default/90 tw-w-[110px] tw-h-[28px] tw-text-primary;
  @apply tw-flex tw-items-center tw-justify-between tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap;

  .icon {
    @apply tw-text-primary;
  }

  &.router-link-exact-active,
  &.router-link-active {
    @apply tw-bg-primary tw-text-white;

    .icon {
      @apply tw-text-white;
    }
  }

  > .label {
    font-size: 0.8334rem;
    display: inline-block;
    max-width: 67px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .removeMark {
    position: absolute;
    top: -10px;
    left: -6px;
    z-index: 1000;
    display: none;
  }

  &:hover {
    .removeMark {
      display: block;
    }
  }
}

:deep(.ada-button) {
  @apply tw-font-medium
}

.mode {
  > .ada-button {
    @apply tw-bg-primary tw-bg-opacity-10 tw-w-10 tw-h-10 tw-rounded;

    &.active {
      @apply tw-bg-primary/20 tw-shadow;

      .icon {
        @apply tw-text-primary;
      }
    }
  }

  > .filter {
    @apply tw-flex tw-flex-row tw-items-center tw-justify-items-stretch tw-px-2 tw-mx-3;
    min-width: 110px;
    background-color: rgba(var(--c-primary), 0.05);
    border-radius: var(--border-radius-root);
    border: solid 1px rgba(var(--c-primary), 0.5);

    > .filter {
      @apply tw-flex tw-mx-2;
    }

    > .txt {
      @apply tw-flex tw-flex-grow;
    }

    > .close {
      @apply tw-flex tw-justify-self-end tw-mx-2;
    }
  }

  > button {
    border-radius: var(--border-radius-root);
    border: none !important;
  }
}

.text-overflow {
  max-height: 30px;
}

.active {
  @apply tw-bg-primary tw-text-white;
}
</style>

<style lang="postcss">
.focus-board {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

  .row {
    margin: 0;
    padding: 0;
    min-height: 32px;

    .col {
      min-height: 32px;
    }
  }
}
</style>

<template>
  <div class="tw-m-0 tw-p-0">
    <header ref="toolbar" class="toolbar">
      <slot name="toolbar"></slot>
      <span v-if="userManager.getBookmarks.length > 0"
            class="tw-h-7 tw-border-r-2 tw-rounded tw-border-primary-200 tw-mr-3 tw-ml-2">
      </span>
      <ada-btn v-for="b in userManager.getBookmarks" :key="b.to" class="bookmark"
               :class="[b.title == currentPath ? 'active' : '']" :to="bookmarkFullPath(b.to)"
               :match="getMatchReg(b.to)"
      >
        <ada-icon :size="14" class="tw-w-8 tw-h-full" v-if="b.title == isShowFilterIcon"
                  :class="[b.title == currentPath ? 'tw-text-white' : '']">
          isax-filter-tick
        </ada-icon>
        <!--                draggable="true" @dragstart="(ev) => drag(b)" @dragover="-->
        <!--                (ev) => {-->
        <!--                ev.preventDefault();-->
        <!--                if (ev.dataTransfer) {-->
        <!--                ev.dataTransfer.dropEffect = 'move';-->
        <!--                }-->
        <!--                }-->
        <!--                " dropzone="true" @drop="-->
        <!--                (ev) => {-->
        <!--                ev.preventDefault();-->
        <!--                drop(b);-->
        <!--                }-->
        <!--                "-->
        <span v-text="b.text != null ? b.text : $t(b.title)" class="text-overflow"></span>
        <ada-icon :size="14" class="tw-w-8 tw-h-full"
                  :class="[b.title == currentPath ? 'tw-text-default' : 'tw-text-primary']"
                  @click.stop.prevent="() => unmark(b)">
          mdi-close
        </ada-icon>
      </ada-btn>
      <ada-toggle class="mode tw-justify-end" color="primary" v-model="viewMode">
        <ada-btn :model="0">
          <ada-icon :size="16"> isax-menu</ada-icon>
        </ada-btn>
        <ada-btn :model="1">
          <ada-icon :size="16"> isax-element-3-bold</ada-icon>
        </ada-btn>
      </ada-toggle>
    </header>
    <ada-tabs class="focus-board" v-if="instruments.length > 0" v-model="viewMode">
      <ada-tab :model="0">
        <DashboardFocusBoardTabView/>
      </ada-tab>
      <ada-tab :model="1">
        <DashboardFocusBoardCardView/>
      </ada-tab>
    </ada-tabs>
  </div>
</template>
