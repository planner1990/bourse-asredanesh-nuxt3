<script setup lang="ts">
import {WatchListColumns} from "~~/types";
let opened = reactive<Array<any>>([]);
const props = defineProps<{
  model: {
    headers: WatchListColumns[];
    item: any;
  };
}>();
function toggle(id: any) {
  const index = opened.indexOf(id);
  if (index > -1) {
    opened.splice(index, 1)
  } else {
    opened.push(id)
  }
}
</script>

<style lang="postcss" scoped>
.row-border {
  @apply tw-p-0;
  position: relative;
  height: var(--row-height) !important;
  max-height: var(--row-height) !important;
  -webkit-user-drag: element;

  td {
    @apply tw-p-0 tw-box-border;
    height: var(--row-height) !important;
    max-height: var(--row-height) !important;
    /* border: none; */
    border-bottom: 1px solid #e0e0e0;
    padding: 0;
  }
}
</style>

<template>
  <tr v-bind="$attrs" class="row-border">
    <td v-for="header in model.headers" :key="header.value" scope="col"
      :class="['tw-text-' + header.align, header.class]">
      <slot :rowItem="model.item" :name="`item.${header.value}`">
        {{ model.item[header.value] }}
      </slot>
    </td>
  </tr>
</template>