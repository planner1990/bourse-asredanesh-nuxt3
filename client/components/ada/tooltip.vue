<script setup lang="ts">
import { Ref, StyleValue, ComputedRef } from "vue";
const props = withDefaults(
  defineProps<{
    position?: "above" | "left" | "right" | "under";
  }>(),
  {
    position: "above",
  }
);

const tooltip: Ref<HTMLElement | null> = ref(null);
const tooltipContent: Ref<HTMLElement | null> = ref(null);
const visible = ref(false);

const properties = computed(() => tooltip.value?.getBoundingClientRect());
const pContent = computed(() => tooltipContent.value?.getBoundingClientRect());
const style: ComputedRef<StyleValue> = computed(() => {
  if (props.position === "left") {
    return {
      top: `${properties.value?.top ?? 0}px`,
      left: `${(properties.value?.left ?? 0) - (pContent.value?.width ?? 0) - 5}px`
    };
  } else if (props.position === "right") {
    return {
      top: `${properties.value?.top ?? 0}px`,
      left: `${(properties.value?.right ?? 0) + 5}px`
    }
  } else if (props.position === "under") {
    return {
      top: `${(properties.value?.bottom ?? 0) + 5}px`,
      left: `${(properties.value?.left ?? 0) - (pContent.value?.width ?? 1) / 2 + (properties.value?.width ?? 1) / 2}px`
    }
  } else {
    return {
      top: `${(properties.value?.top ?? 0) - (pContent.value?.height ?? 0) - 5}px`,
      left: `${(properties.value?.left ?? 0) - (pContent.value?.width ?? 1) / 2 + (properties.value?.width ?? 1) / 2}px`
    }
  }
});
</script>
<style lang="postcss" scoped>
.ada-tooltip-container {
  @apply tw-relative tw-w-fit tw-h-fit;
}
</style>
<style lang="postcss">
.ada-tooltip {
  @apply tw-absolute tw-w-fit tw-flex tw-justify-center tw-items-center tw-bg-primary tw-rounded tw-px-1 tw-text-white tw-pointer-events-none;
  min-width: 20px;
  min-height: 20px;
  z-index: 1000;
  touch-action: none;
  white-space: nowrap;
  font-weight: bolder;
}
</style>
<template>
  <div ref="tooltip" class="ada-tooltip-container" @mouseenter="visible = true" @mouseleave="visible = false">
    <slot name="activator"></slot>
    <Teleport to="body">
      <Transition name="slide-fade">
        <span v-if="visible" ref="tooltipContent" :style="style" class="ada-tooltip">
          <slot>
          </slot>
        </span>
      </Transition>
    </Teleport>
  </div>
</template>
