<script setup lang="ts">
import {useMessages} from "~~/composables";

const route = useRoute();
const messageManager = useMessages();


messageManager.message_active = await messageManager.getMessage(
    parseInt(route.params.messageId as string)
);
const componentName = computed(() => `lazy-message-${messageManager.message_active?.['messageType']}`);
const componentModel = computed(() => messageManager.message_active?.message);
const messageBody = computed(() => messageManager.message_active?.message.body);

</script>

<template>
    <div class="tw-w-full tw-h-full">
        <component v-if="componentName" :is="componentName" v-model="componentModel"></component>
        <div class="tw-mx-5 tw-pt-3">{{ messageBody }}</div>
    </div>
</template>
