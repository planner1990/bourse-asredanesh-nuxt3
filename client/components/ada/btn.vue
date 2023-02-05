<script setup lang="ts">
import { Ref } from "vue";
const props = withDefaults(
  defineProps<{
    model?: any;
    type?: "button" | "submit" | "reset";
    icon?: boolean;
    to?: string;
    match?: RegExp;
  }>(),
  {
    type: "button",
    icon: false
  }
);
const router = useRouter();
const route = useRoute();
const value: Ref<any> = inject("toggle-ref", ref(null));
const isActive = computed<boolean>(() => props.match
  ? props.match.test(decodeURIComponent(route.fullPath))
  : props.to
    ? route.path == props.to
    : false)

function click() {
  if (props.to) router.push(props.to);
  if (!(props.match || props.to)) value.value = props.model
}

watch(
  () => route.fullPath,
  () => {
    if (isActive.value)
      value.value = props.model;
  }
);
if (isActive.value)
  value.value = props.model;

</script>

<style lang="postcss" scoped>
.ada-button {
  @apply tw-font-bold tw-relative tw-text-ellipsis tw-rounded tw-bg-default tw-outline-none;

  &:disabled {
    @apply tw-bg-gray4 tw-text-gray-400 tw-opacity-20;
  }

  &.active::after {
    @apply tw-rounded tw-absolute tw-w-full tw-h-full;
    content: "";
    top: 0;
    left: 0;
    user-select: none;
    pointer-events: none;
  }
}
</style>

<template>
  <button class="ada-button" v-bind="$attrs" @click="click" :class="{
    active:
      (typeof props.model != 'undefined' && props.model == value) || isActive,
  }" :type="type">
    <slot></slot>
  </button>
</template>
