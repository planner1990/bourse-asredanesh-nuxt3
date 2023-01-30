<script lang="ts" setup>
import { Ref, StyleValue, ComputedRef } from "vue";
import { useAsrTrader } from "~/composables";

const props = withDefaults(defineProps<{
  mLeft?: number,
  mTop?: number,
  active?: boolean,
  mWidth?: number,
  boxShadow?: boolean
}>(),
  {
    mLeft: 0,
    mTop: 0,
    active: false,
    mWidth: 0,
    boxShadow: false
  }
)
const appManager = useAsrTrader();
const rtl = computed(() => appManager.rtl);
const locale = computed(() => appManager.locale);

const menu: Ref<HTMLElement | null> = ref(null)
const menuContent: Ref<HTMLElement | null> = ref(null)
const properties = computed(() => menu.value?.getBoundingClientRect())
const style: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${(properties.value?.width ?? 0) + props.mWidth}px`,
    left: `${(properties.value?.left ?? 0) + props.mLeft}px`,
    top: `${(properties.value?.top ?? 0) + props.mTop}px`
  }
})

</script>


<style lang="postcss" scoped>
/* .menu-global {
    @apply tw-block tw-w-full;
} */
.menu {
  @apply tw-absolute tw-bg-white tw-outline-none tw-shadow-lg tw-overflow-y-auto tw-p-0 tw-m-0 tw-rounded-b;
  max-width: 465px;
  max-height: calc(50vh - 76px);
  z-index: 1000;

  ul li {
    @apply hover: tw-bg-primary/10;
  }
}

.boxShadow {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
}
</style>

<template>
  <div class="menu-global" ref="menu">
    <slot name="activator"></slot>
    <Teleport to="body">
      <div ref="menuContent" :style="style" v-if="active" class="menu"
        :class="[rtl ? 'rtl' : null, locale, boxShadow ? 'boxShadow' : '']">

        <slot name="prepend-item"></slot>
        <slot name="items"></slot>
        <slot name="append-item"></slot>
      </div>
    </Teleport>
  </div>
</template>