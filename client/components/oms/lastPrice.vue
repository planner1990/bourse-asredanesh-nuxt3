<script setup lang="ts">
import { InstrumentCache } from "@/types"
import { useAsrTrader } from "~/composables";

const props = defineProps<{ value: InstrumentCache }>();

const appManager = useAsrTrader();
const formatter = appManager.formatter;
defineExpose({
    formatter,
});
</script>

<style lang="postcss" scoped>
.value {
    font-size: var(--value-font-size);
    font-weight: 500;
    color: var(--c-primary-rgb);
}

.up {
    color: var(--c-success-rgb);
}

.down {
    color: var(--c-error-rgb);
}
</style>

<template>
    <span class="tw-whitespace-nowrap value"
        :class="[value.last < value.closing ? 'down' : value.last > value.closing ? 'up' : '']" dir="ltr">
        ({{ formatter.format(value.last) }})
        <slot>
        </slot>
    </span>
</template>
