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
const matchPath = ref(null);

function click() {
  if (props.to) router.push(props.to);
  if(!(props.match || props.to)) value.value = props.model
}

const isActive = (path: string): boolean => {
  return props.match
    ? props.match.test(path)
    : props.to
    ? route.path == props.to
    : false;
};

onMounted(() => {
  setActive(route.path)
});

watch(
  () => route.path,
  (newVal) => {
    setActive(newVal as string)
  }
);

function setActive(path: string) {
  if (isActive(path)) {
    value.value = props.model;
    matchPath.value = true
  }else { matchPath.value = isActive(path); }
}

 // watch(route, () => {
 //   console.log(route);
 // })

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
  <button
    class="ada-button"
    v-bind="$attrs"
    @click="click"
    :class="{
      active:
        (typeof props.model != 'undefined' && props.model == value) || matchPath,
    }"
    :type="type"
  >
    <slot></slot>
  </button>
</template>
