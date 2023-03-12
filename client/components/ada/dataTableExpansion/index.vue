<script setup lang="ts">
import { WatchListColumns } from "~~/types";

const props = withDefaults(defineProps<{
  headers?: Array<WatchListColumns>;
  items?: Array<any>;
  itemKey?: string;
}>(), {
  itemKey: "id",
  headers: () => [],
  items: () => []
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
        <ada-data-table-expansion-header-handler-expansion @headers-changed="headersChanged" :headers="headers">
          <template v-for="header in headers" v-slot:[`header.${header.value}`]>
            <slot :header="header" :name="'header.' + header.value"></slot>
          </template>
        </ada-data-table-expansion-header-handler-expansion>
      </slot>
      <tbody>
        <slot>
          <ada-data-table-expansion-row-handler-expansion v-for="item in props.items" :key="item[itemKey]" :model="{ headers, item }">
            <template v-for="header in headers" v-slot:[`item.${header.value}`]>
              <slot :item="item" :name="'item.' + header.value"></slot>
            </template>
          </ada-data-table-expansion-row-handler-expansion>
        </slot>
      </tbody>
      <tfoot>
        <slot name="footer"></slot>
      </tfoot>
    </table>
  </div>
</template>
