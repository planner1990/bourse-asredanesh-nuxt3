<script setup lang="ts">
import {useMessages} from "~~/composables";

const route = useRoute();
const messageManager = useMessages();
const router = useRouter()
messageManager.message_active = await messageManager.getMessage(
    parseInt(route.query.id as string)
);

// const { data: posts } = await useAsyncData(
//     'posts',
//     () => router.push({path: `/watchlist/${route.params.name}/messages`,
//         query: {id: route.query.id}}), {
//         watch: [route.query]
//     }
// )

watch(route, async () => {
    messageManager.message_active = await messageManager.getMessage(
        parseInt(route.query.id as string)
    );
});
const componentName = computed(() => `lazy-message-${messageManager.message_active?.['messageType']}`);
const componentModel = computed(() => messageManager.message_active?.message);
const messageBody = computed(() => messageManager.message_active?.message.body);
</script>

<template>
    <div class="tw-w-full tw-h-full">
        <component v-if="componentName" :is="componentName" v-model="componentModel"></component>
        <div class="tw-mx-6 tw-pt-3 tw-text-justify tw-text-lg">{{ messageBody }}</div>
    </div>
</template>
