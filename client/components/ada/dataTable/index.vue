<script setup lang="ts">
import { WatchListColumns } from "~~/types";

const props = withDefaults(defineProps<{
  headers?: Array<WatchListColumns>;
  items?: Array<any>;
  itemKey?: string;
  isHover?: boolean;
}>(), {
  itemKey: "id",
  headers: () => [],
  items: () => [],
  isHover: false
});
const emit = defineEmits(["headersChanged"])
function headersChanged(value: Array<WatchListColumns>) {
  emit("headersChanged", value)
}
</script>
<style scoped lang="postcss">
.ada-dataTable {
  @apply tw-w-full;
  overflow-y: auto;
}
</style>
<template>
  <div class="table-container">
    <table class="ada-dataTable">
      <slot name="header">
        <ada-data-table-header-handler @headers-changed="headersChanged" :headers="headers">
          <template v-for="header in headers" v-slot:[`header.${header.value}`]>
            <slot :header="header" :name="'header.' + header.value"></slot>
          </template>
        </ada-data-table-header-handler>
      </slot>
      <tbody>
        <slot>
          <ada-data-table-row-handler v-for="item in props.items" :key="item[itemKey]" :model="{ headers, item }" :isHover="isHover">
            <template v-for="header in headers" v-slot:[`item.${header.value}`]>
              <slot :item="item" :name="'item.' + header.value"></slot>
            </template>
          </ada-data-table-row-handler>
        </slot>
      </tbody>
      <tfoot>
        <slot name="footer"></slot>
      </tfoot>
    </table>
  </div>
</template>
