<script setup lang="ts">
import {useInstrument, useBottomPanel} from "~~/composables";
import {TabItem} from "~~/types";

const instrumentManager = useInstrument();
const bottomPanel = useBottomPanel();
const router = useRouter()
const route = useRoute()
const active = computed<TabItem | null>({
    get() {
        return bottomPanel.current?.children?.find((item) => item.match?.test(bottomPanel.current?.path ?? "")) ?? null
    },
    set(val) {
        if (val != null && bottomPanel.current)
            bottomPanel.current.path = val.path
    }
})

const tabs = computed(() => bottomPanel.tabs);
const visibleTabs = computed(() => bottomPanel.tabs.filter((x) => x.show));
const slideToBottom = computed(() => !bottomPanel.state.showFinancialInfo);

function close() {
    router.push(`/watchlist/${route.params.name}`)
    active.value = null;
    bottomPanel.current = null;
}

function expand() {
    bottomPanel.toggleExpand();
}

function triggerDropDown(t: any) {
    if (t.dropDown) t.dropDown.show = !t.dropDown.show;
    watch(t, () => {
        t.match.test(route.fullPath);
    })
}

function closeDropDown(tab: any) {
    if (tab.dropDown) {
        tab.dropDown.show = false
    }
}


</script>

<style lang="postcss" scoped>
.ada-bottom-panel {
    @apply tw-flex tw-flex-col tw-flex-grow;
    @apply tw-transition-all tw-ease-in-out tw-duration-700;
    position: fixed;
    bottom: 32px;
    left: 48px;
    right: 48px;
    width: calc(100% - 96px);

    &.slideToBottom {
        bottom: 0;
    }

    &.expanded {
        height: calc(100vh - 74px);

        &.slideToBottom {
            height: calc(100vh - 42px);
        }
    }

    &.half {
        height: calc(100vh - 440px);
        min-height: 30vh;

        &.slideToBottom {
            height: calc(100vh - 404px);
        }
    }

    &.hidden {
        height: 32px;
        /* background-color: red; */
    }

    > .detail {
        @apply tw-relative tw-w-full tw-bg-white;
        font-size: 1rem;
        line-height: 1.5;
        height: calc(100% - 32px);

        > .header {
            @apply tw-absolute tw-flex tw-flex-grow tw-items-center tw-w-full tw-bg-primary/10 tw-shadow tw-shadow-primary/50;
            top: 0;
            left: 0;
            height: 32px;
            padding: 0 12px;

            .b-tabs {
                @apply tw-bg-transparent;
              z-index: 2;
            }
        }

        > .contents {
            @apply tw-mt-[32px];
            overflow-y: auto;
            height: calc(100% - 32px);

            .tabs {
                @apply tw-h-full;

                .tab :deep(p) {
                    @apply tw-p-5 tw-leading-8;
                }
            }

            .tab--active {
                @apply tw-overflow-auto;
            }

        }
    }

    .b-tabs {
        @apply tw-justify-start tw-w-full tw-relative tw-bg-primary/10;
        box-shadow: 0 0 1px 0 #e2e2e2;
        min-height: 32px;
        max-height: 32px;

        .tab-title {
            @apply tw-bg-transparent tw-border-none tw-min-h-[32px] tw-min-w-[168px];
            margin-inline-start: 3px;

            &::after {
                @apply tw-bg-primary/20 tw-opacity-100;
                border-radius: 0 !important;
            }
        }

        &::before {
            @apply tw-absolute tw-inset-0 tw-w-full tw-h-full;
            content: '';
            pointer-events: none;

        }
    }

    .active {
        @apply tw-text-primary;
    }

}
</style>

<style lang="postcss">
.dashboardmain-page {
    &.left {
        .ada-bottom-panel {
            @apply tw-pl-[208px]
        }
    }

    &.right {
        .ada-bottom-panel {
            @apply tw-pr-[208px]
        }
    }
}
</style>

<template>
    <footer class="ada-bottom-panel" :class="{
        half: bottomPanel.current != null && !bottomPanel.expanded,
        expanded: bottomPanel.current != null && bottomPanel.expanded,
        slideToBottom
    }">
        <div class="detail" v-if="bottomPanel.current">
            <div class="contents">
                <slot></slot>
            </div>
            <header class="header">
                <ada-toggle v-model="active" class="b-tabs tw-overflow-x-auto tw-overflow-y-hidden">
                    <ada-btn class="tab-title tw-flex tw-justify-center tw-items-center"
                             v-for="(t, i) in bottomPanel.current?.children" :key="t.title" :model="t" :match="t.match"
                             :to="`/watchlist/${$route.params.name}/${t.path ?? ''}`">
                        <span>{{ $t(t.title) }}</span> <span v-if="t.secondTitle">6{{ ` - ${t.secondTitle}` }}</span>
                        <div v-if="i !== (bottomPanel.current.children?.length ?? 0) - 1" class="bar"></div>
                        <!----------------------------------- drop down for bottom panel ------------------------------------------->
                        <div class="select-box tw-absolute tw-top-2 tw-left-3" v-if="t.dropDown"
                             @focusout="closeDropDown(t)">
                            <ada-menu :active="t.dropDown?.show && t.match?.test(route.fullPath)" :mTop="33.5"
                                      :mWidth="147" class="tw-w-fit tw-mx-auto"
                                      box-shadow>
                                <template #activator>
                                    <ada-btn @click="triggerDropDown(t)"
                                             :class="{ active: t.dropDown.show }"
                                             class="tw-bg-transparent">
                                        <ada-icon :size="16">
                                            mdi-chevron-down
                                        </ada-icon>
                                    </ada-btn>
                                </template>
                                <template #items>
                                    <ada-list class="tw-p-0 tw-m-0 tw-shadow-inner tw-shadow-slate-300 tw-px-3 tw-pt-3">
                                        <ada-input :placeholder="$t('user.search')">
                                            <template #prepend="{ active }">
                                                <ada-icon :size="14" class="tw-text-gray9 tw-pr-2">
                                                    isax-search-normal-1
                                                </ada-icon>
                                            </template>
                                        </ada-input>
                                        <hr class="divider tw-border-divider tw-mt-3"/>
                                        <ada-list-item v-for="dropDown in t.dropDown?.items" :key="dropDown.id"
                                                       class="item">
                                            <!--          <ada-icon :class="[i.selected? 'tw-text-primary': 'tw-text-gray4']" :size="22"> isax-tick </ada-icon>-->
                                            <span v-text="dropDown.fullName"></span>
                                        </ada-list-item>
                                    </ada-list>
                                </template>
                            </ada-menu>
                        </div>

                        <!----------------------------------- /  drop down for bottom panel ------------------------------------------->
                    </ada-btn>
                </ada-toggle>
                <ada-btn class="tw-mx-[5px] tw-h-[24px] tw-w-[24px]"
                         :class="[bottomPanel.expanded && active != null ? 'tw-bg-primary' : 'tw-bg-transparent']"
                         @click="expand">
                    <ada-icon :class="[bottomPanel.expanded && active != null ? 'tw-text-white' : 'tw-text-primary']"
                              :size="16">
                        isax-maximize-3
                    </ada-icon>
                </ada-btn>
                <ada-btn class="tw-h-[24px] tw-w-[24px] tw-bg-primary" @click="close">
                    <ada-icon class="tw-text-white" :size="16">mdi-window-close</ada-icon>
                </ada-btn>
            </header>
        </div>
        <ada-toggle class="b-tabs tw-overflow-x-auto tw-overflow-y-hidden" v-model="bottomPanel.current">
            <ada-btn class="tab-title" v-for="(t, i) in tabs" :key="t.title"
                     :to="`/watchlist/${$route.params.name}/${t.path}`" v-show="t.show" :model="t" :match="t.match">
                <span :class="{ 'active': bottomPanel.current != null && bottomPanel.current?.title === t.title }">
                    {{ $t(t.title) }}
                    <span
                            v-text="instrumentManager.state.selected && !t.deletable ? '-' + instrumentManager.state.selected.name : ''"></span>
                </span>
                <div v-if="i < visibleTabs.length - 1" class="bar"></div>
                <ada-btn v-if="t.deletable"
                         class="tw-absolute tw-items-center tw-leading-[12px] tw-top-2 tw-left-2 tw-h-[18px] tw-w-[18px] tw-bg-error"
                         @click.stop.prevent="() => { bottomPanel.removeTab(t.id); router.push(`/watchlist/${route.params.name}`); }">
                    <ada-icon class="tw-font-bold tw-text-white">
                        mdi-close
                    </ada-icon>
                </ada-btn>
            </ada-btn>
        </ada-toggle>
    </footer>
</template>
