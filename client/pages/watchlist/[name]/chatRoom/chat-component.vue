<script setup lang="ts">

</script>

<style scoped lang="postcss">
:deep(input::placeholder) {
    @apply tw-text-gray2;
}

:deep(input) {
    @apply tw-border tw-border-white;
    width: 14%;
}

:deep(.ada-input .scaffold ) {
    border-color: rgba(216, 216, 216, 1);
    background-color: white;
}

</style>

<template>
    <div class="tw-flex tw-bg-grayF6 tw-h-[300px]">
        <div class="tw-w-1/4 tw-bg-white tw-p-3">
            <!--            <ada-input-->
            <!--                    :placeholder="$t('user.search')"-->
            <!--                    class="tw-mx-auto tw-text-success">-->
            <!--                <template #prepend>-->
            <!--                    <ada-icon class="tw-text-gray9" :size="14"> isax-search-normal-1</ada-icon>-->
            <!--                </template>-->
            <!--            </ada-input>-->
            <ada-input :placeholder="$t('user.search')"
                       class="tw-h-9 tw-bg-white">
                <template #prepend="{ active }">
                    <ada-icon :size="14" class="tw-text-gray9 tw-bg-white tw-mr-2">
                        isax-search-normal-1
                    </ada-icon>
                </template>
            </ada-input>
        </div>
        <div class="tw-w-2/3">left</div>
    </div>
</template>
