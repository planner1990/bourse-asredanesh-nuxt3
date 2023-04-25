<script setup lang="ts">
import {nextTick} from 'vue'

const tab = ref<number>(1);
const yourMessage = ref<string>("");
const items = reactive<any>(["tab 1", "tab 2"]);
const messages = reactive<any>([
    {text: "سلام. چطور می توانم کمکتان کنم؟", role: "admin"},
    {text: "سلام. چطور می توانم پول خودم را برداشت کنم؟", role: "costumer"},
]);
const chatArea = ref()

function changeTab(tabNumber: number) {
    tab.value = tabNumber;
}

async function sendMessage(direction: string) {
    if (!yourMessage.value) {
        return;
    }
    if (direction === "out") {
        messages.push({text: yourMessage.value, role: "costumer"});
        yourMessage.value = "";
    } else {
        alert("خطایی رخ داده است.");
    }
    await nextTick(() => {
        console.log(chatArea.value);
        let messageDisplay = chatArea.value;
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
    });
}

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

.list-enter-active {
    transition: all 0.5s ease;
}

.list-leave-active {
    transition: all 0s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

:deep(.header-tabs) {
    @apply tw-my-4
}

:deep(.header-tabs button) {
    @apply tw-mx-3 tw-bg-white tw-font-semibold tw-text-sm tw-text-gray9;
}

:deep(.header-tabs .active) {
    @apply tw-bg-primary tw-bg-opacity-20 tw-text-primary tw-py-2 tw-px-3;
    border-radius: 14px !important;
}


/* --------------  Chat Box -------------------- */

.chat-area {
    height: 188px;
    overflow: auto;
    padding-top: 20px;
}

.message {
    max-width: 270px;
    border-radius: 10px;
    padding: 0.9em;
    font-size: 0.7em;
}

.message-out {
    @apply tw-bg-primary tw-text-white tw-rounded-lg tw-rounded-tr-none;
    margin-left: 50%;
    margin-right: 10px;
}

.message-in {
    @apply tw-bg-primary tw-bg-opacity-10 tw-text-gray2 tw-rounded-lg tw-rounded-tl-none;
    margin-right: 68%;
    text-align: right;
    padding-left: 10px;
}


</style>

<template>
    <div class="tw-flex tw-bg-grayF6 tw-h-full">
        <div class="tw-w-1/4 tw-bg-white tw-p-3 tw-overflow-y-auto">
            <ada-input :placeholder="$t('user.search')"
                       class="tw-h-9 tw-bg-white">
                <template #prepend="{ active }">
                    <ada-icon :size="14" class="tw-text-gray9 tw-bg-white tw-mr-2">
                        isax-search-normal-1
                    </ada-icon>
                </template>
            </ada-input>


            <ada-toggle v-model="tab" class="header-tabs">
                <ada-btn class="buy tw-rounded-none" :height="32" :model="1" @click="changeTab(1)">
                    همه
                </ada-btn>
                <ada-btn class="sell tw-rounded-none" :height="32" :model="2" @click="changeTab(2)">
                    مخاطبین
                </ada-btn>
                <ada-btn class="sell tw-rounded-none" :height="32" :model="3" @click="changeTab(3)">
                    گروه ها
                </ada-btn>
            </ada-toggle>
            <div class="tw-relative">
                <TransitionGroup name="list" tag="div" appear>
                    <div v-if="tab === 1" :key="1">
                        <div class="tw-flex tw-mb-4 tw-cursor-pointer" v-for="i in 10">
                            <div class="tw-flex tw-bg-opacity-10 tw-bg-info tw-px-3 tw-rounded-full tw-mx-3">
                                <ada-icon :size="20" class="tw-text-success">isax-profile-2user-bold</ada-icon>
                            </div>
                            <div class="tw-w-full">
                                <div class="tw-flex tw-justify-between tw-font-semibold">
                                    <div>حسین لطفی</div>
                                    <div>۱۲:۵۶</div>
                                </div>
                                <div class="tw-text-gray9">من الان میتونم سهم فرآور ثبت درخوا...</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab === 2" :key="2">
                        <div class="tw-flex tw-mb-4 tw-cursor-pointer" v-for="i in 3">
                            <div class="tw-flex tw-bg-opacity-10 tw-bg-info tw-px-3 tw-rounded-full tw-mx-3">
                                <ada-icon :size="20" class="tw-text-info">isax-frame-bold</ada-icon>
                            </div>
                            <div class="tw-w-full">
                                <div class="tw-flex tw-justify-between tw-font-semibold">
                                    <div>حسین لطفی</div>
                                    <div>۱۲:۵۶</div>
                                </div>
                                <div class="tw-text-gray9">من الان میتونم سهم فرآور ثبت درخوا...</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="tab === 3" :key="3">
                        <div class="tw-flex tw-mb-4 tw-cursor-pointer" v-for="i in 6">
                            <div class="tw-flex tw-bg-opacity-10 tw-bg-info tw-px-3 tw-rounded-full tw-mx-3">
                                <ada-icon :size="20" class="tw-text-success">isax-profile-2user-bold</ada-icon>
                            </div>
                            <div class="tw-w-full">
                                <div class="tw-flex tw-justify-between tw-font-semibold">
                                    <div>حسین لطفی</div>
                                    <div>۱۲:۵۶</div>
                                </div>
                                <div class="tw-text-gray9">من الان میتونم سهم فرآور ثبت درخوا...</div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
                <ada-btn
                        class="tw-ml-6 tw-bg-primary tw-text-white tw-min-w-[70px]
                        tw-min-h-[36px] tw-text-[13px] tw-px-3 tw-py-2 tw-rounded-lg tw-sticky tw-right-3/4 tw-bottom-6">
                    <ada-icon :size="18" class="tw-text-white tw-ml-2">isax-add</ada-icon>
                    گفتگو جدید
                </ada-btn>
            </div>


        </div>
        <div class="tw-w-3/4 tw-p-3 tw-flex tw-flex-col tw-justify-between">
            <!----------------------  Chat Header  -------------------------->
            <div>
                <div class="tw-bg-white tw-h-12 tw-rounded-lg tw-flex tw-items-center tw-justify-between tw-px-4">
                <span>
                    <ada-icon :size="18" class="tw-text-gray9 tw-bg-white tw-mr-2 tw-cursor-pointer">
                        isax-search-normal-1
                    </ada-icon>
                </span>
                    <span class="tw-font-semibold tw-text-sm">
                    حسین لطفی
                </span>
                    <span>
                    <ada-icon :size="18" class="tw-text-gray9 tw-cursor-pointer">
                       mdi-dots-vertical
                    </ada-icon>
                </span>
                </div>

                <!----------------------  Chat Box  -------------------------->

                <section ref="chatArea" class="chat-area">
                    <p
                            v-for="message in messages"
                            class="message tw-mb-2"
                            :class="{ 'message-out': message.role === 'costumer', 'message-in': message.role === 'admin' }"
                    >
                        {{ message.text }}
                    </p>
                </section>
            </div>


            <div class="tw-mt-3">
                <ada-input
                        class="tw-h-9"
                        v-model="yourMessage"
                        type="text"
                        @keyup.enter.prevent="sendMessage('out')"
                >
                    <template #prepend>
                        <ada-icon class="tw-text-primary tw-rotate-[110deg] tw-mr-2 tw-cursor-pointer" :size="16">
                            isax-link-2
                        </ada-icon>
                    </template>
                    <template #append>
                        <ada-icon class="tw-text-primary tw-rotate-[-90deg] tw-ml-4 tw-cursor-pointer" :size="18"
                                  @click="sendMessage('out')">
                            isax-send-2-bold
                        </ada-icon>
                    </template>
                </ada-input>
            </div>

        </div>
    </div>
</template>
