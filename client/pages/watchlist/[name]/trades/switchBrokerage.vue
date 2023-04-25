<script setup lang="ts">
import {usePayment} from "@/composables";
import {useAxios} from "@/composables";
import NumericField from "~/components/numericField.vue";


const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];

const paymentManager = usePayment();

const banks = computed(() => paymentManager.paymentMethods);

const amount = ref(0);
const axios = useAxios();
const paymentMethod = ref(null);
const router = useRouter();

</script>
<style lang="postcss" scoped>
.tmp-ctr {
    @apply tw-h-full tw-w-full;
}

.deposit {
    @apply tw-grid tw-h-full tw-grid-cols-2 tw-gap-[12px] tw-m-0 tw-p-[12px] tw-relative tw-bg-white;

    &::before {
        content: "";
        @apply tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-bg-white;
        z-index: -1;
    }

    .card {
        @apply tw-p-[12px] tw-bg-grayF8 tw-rounded-lg;

        .label {
            @apply tw-text-primary tw-font-semibold tw-text-sm;
        }
    }

    form {
        &.card {
            > div {
                @apply tw-m-auto;
                max-width: 65%;
            }
        }
    }
}

:deep(input::placeholder) {
    @apply tw-text-gray4;
}

:deep(input) {
    @apply tw-border tw-border-white;
    width: 14%;
}

:deep(.search .ada-input .scaffold ) {
    @apply tw-bg-white tw-h-[45px];
    border-color: rgba(216, 216, 216, 1);
}

:deep(.description .ada-input .scaffold ) {
    @apply tw-bg-white tw-h-[66px] tw-mt-3;
    border-color: rgba(216, 216, 216, 1);
}
</style>

<template>
    <div class="tmp-ctr">
        <main class="deposit">
            <form class="card">
                <div class="tw-font-semibold tw-text-sm tw-text-gray2 tw-mt-7 tw-mb-3">انتخاب نماد</div>
                <div class="search">
                    <ada-input :placeholder="$t('user.search')"
                               class="tw-h-14 tw-bg-white">
                        <template #prepend="{ active }">
                            <ada-icon :size="14" class="tw-text-gray9 tw-bg-white tw-mr-2">
                                isax-search-normal-1
                            </ada-icon>
                        </template>
                    </ada-input>
                </div>
                <div class="description">
                    <ada-input :placeholder="$t('user.description')"
                               class="tw-h-16 tw-bg-white">
                    </ada-input>
                </div>

                <div class="tw-flex tw-mt-5">
                    <div class="tw-w-1/2 tw-ml-3">
                        <ada-btn
                                class="tw-bg-transparent tw-text-primary tw-w-full tw-min-h-[36px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg tw-border tw-border-primary">
                            {{ $t("instrument.switchBrokerageReport") }}
                        </ada-btn>
                    </div>
                    <div class="tw-w-1/2 tw-mr-3">
                        <ada-btn
                                class="tw-bg-primary tw-text-white tw-w-full tw-min-h-[36px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg">
                            {{ $t("instrument.requestRegistration") }}
                        </ada-btn>
                    </div>
                </div>
            </form>
            <section>
                <div class="card tw-h-full">
                    <div class="tw-text-gray3 tw-mt-6">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                    </div>
                    <div class="tw-text-gray3 tw-mt-9">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                    </div>
                    <div class="tw-text-gray3 tw-mt-9">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
