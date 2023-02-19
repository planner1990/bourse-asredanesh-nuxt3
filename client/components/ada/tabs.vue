<script setup lang="ts">

const props = withDefaults(
    defineProps<{
        modelValue?: any;
        nameKey?: string;

    }>(),
    {
        modelValue: 0,
        nameKey: '$'
    }
);
const emit = defineEmits(["update:modelValue"]);
const val = computed({
    get: () => props.modelValue,
    set(value) {
        emit("update:modelValue", value)
    }
});
const nameCalculator = Function("obj", `return ${props.nameKey.replace('$', 'obj')};`)
const name = computed(() => nameCalculator(val.value))

provide("tab-ref", val);
provide("tab-name", name);

</script>
<style lang="postcss" scoped>
.tabs {
    @apply tw-relative tw-overflow-clip;
}
</style>
<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>