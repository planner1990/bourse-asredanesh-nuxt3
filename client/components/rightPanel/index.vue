<script setup lang="ts">
import { useBottomPanel } from "~/composables"
import { useAsrTrader } from "~/composables";
import { getMenuItems } from "./items";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    mini?: boolean;
    clipped?: boolean;
  }>(),
  {
    modelValue: true,
    mini: false,
    clipped: true,
  }
);

const emit = defineEmits([
  "update:modelValue",
  "update:mini",
  "update:clipped",
]);

const appManager = useAsrTrader();
const bottomPanel = useBottomPanel();

const selected = computed({
  get() {
    return appManager.menu;
  },
  set(val: string | number | null) {
    appManager.setMenu(val);
  },
});

const items = getMenuItems();





</script>

<style lang="postcss" scoped>
.r-panel {
  font-size: 0.875rem;
  /* padding-top: 42px; */
  @apply tw-bg-primary tw-bg-opacity-10;

  &::before {
    @apply tw-inset-0 tw-absolute tw-w-full tw-h-full;
    z-index: -1;
    background-color: white;
    content: "";
    touch-action: none;
    pointer-events: none;
  }

  .tabs {
    @apply tw-items-center tw-px-2 tw-shadow-[-2px_1px_2px_0] tw-shadow-primary/20 tw-overflow-y-auto;
    padding-top: 8px;
    height: calc(100vh - 42px);
    padding-bottom: 54px;
    min-width: 48px;
    width: 48px;
    max-width: 48px;
    flex-basis: 48px;

    .icon {
      font-size: 1.5rem;
    }

    .divider {
      @apply tw-text-gray3;
    }
  }

  .tab-items {
    width: calc(100% - 48px);
    @apply tw-shadow-[-2px_1px_2px_0] tw-overflow-clip tw-shadow-primary/20;

    .tab {
      @apply tw-flex tw-flex-col tw-flex-grow;
      flex-basis: 32px;
      overflow-y: auto;
    }
  }

  .ada-button {
    @apply tw-bg-transparent tw-w-[32px] tw-h-[32px];

    &.active {
      @apply tw-bg-primary tw-bg-opacity-20;

      .icon {
        @apply tw-text-primary;
      }
    }
  }
}
</style>
<style lang="postcss">
.r-panel {

  .router-link-active,
  .router-link-exact-active {
    @apply tw-bg-primary tw-bg-opacity-10;
  }
}
</style>

<template>
  <ada-nav min-width="48px" max-width="256px" :mini="mini" class="r-panel" mobile-breakpoint="960" fixed>
    <div class="tabs">
      <ada-toggle class="tw-flex-wrap">
        <ada-tooltip v-for="item in items" :key="item.title" position="left">
          <template #activator>
            <ada-btn :to="`/watchlist/${$route.params.name}/${item.path}`" :match="item.match" :model="item">
              <ada-icon size="18" :class="[item.color ? `tw-text-${item.color}` : null]">
                {{ item.icon }}
              </ada-icon>
            </ada-btn>
          </template>
          <span>{{ $t(item.title) }}</span>
        </ada-tooltip>
      </ada-toggle>
    </div>
  </ada-nav>
</template>
