<template>
  <span class="text-no-wrap value" dir="ltr">
    {{ formatter.format(value) }}
    <slot>
    </slot>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number
  }>(), {
  value: 0
})
const appManager = useAsrTrader();
const formatter = appManager.percentFormatter;
defineExpose({
  formatter,
});
</script>
<style lang="postcss" scoped>
.value {
  font-size: var(--value-font-size);
}
</style>
