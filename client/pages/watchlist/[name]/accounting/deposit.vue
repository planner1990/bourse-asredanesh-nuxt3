<script setup lang="ts">
import {usePayment} from "@/composables";
import {useAxios} from "@/composables";


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
  @apply tw-grid tw-grid-cols-2 tw-gap-[12px] tw-m-0 tw-p-[12px] tw-relative tw-bg-white;
  height: auto;

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

        > .banks {
          @apply tw-flex tw-justify-between tw-w-full tw-mb-7 tw-h-[64px];

          > button {
            @apply tw-flex tw-justify-center tw-items-center tw-border tw-border-default tw-rounded-lg  tw-w-[64px] tw-text-white tw-bg-white;

            &.active {
              @apply tw-border-primary;


            }
          }
        }

        > .actions {
          @apply tw-h-12 tw-my-[16px] tw-flex tw-justify-between;

          .ada-button {
            width: 45%;

            &:nth-child(1) {
              @apply tw-bg-white tw-border tw-border-primary tw-bg-opacity-90 hover:tw-bg-primary hover:tw-bg-opacity-90 hover:tw-text-white;
            }

            &:nth-child(2) {
              @apply tw-bg-primary tw-bg-opacity-90 tw-text-white;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="postcss">
.deposit {
  .card {
    .ada-input {
      @apply tw-mt-4;

      .label {
        @apply tw-mt-2 tw-text-primary tw-font-semibold tw-text-sm tw-mb-3;
      }

      .scaffold {
        @apply tw-border tw-border-primary tw-px-3 tw-h-[42px] tw-bg-white tw-mb-3;

        > span {
          @apply tw-bg-primary tw-bg-opacity-10 tw-block tw-relative tw-h-full tw-text-center;
          @apply tw-font-semibold tw-text-sm tw-flex tw-justify-center tw-items-center tw-w-12 tw-right-3 tw-text-primary;
        }

        &.active {
          @apply tw-border-primary;
        }
      }
    }
  }
}
</style>
<template>
  <div class="tmp-ctr">
    <main class="deposit">
      <form class="card">
        <div>
          <ada-currency-input v-model="amount" :label="$t('accounting.amount')">
            <template #append>
              <span v-text="$t('accounting.currency.rial')"></span>
            </template>
          </ada-currency-input>
          <span class="label" v-text="$t('accounting.gateway')"></span>
          <ada-toggle class="banks" style="flex-grow: 0">
            <ada-btn
                v-for="(bank, i) in banks"
                :key="bank.name"
                :model="i"
                class="tw-mt-3 tw-w-[56px] tw-h-[56px]"
            >
              <img :src="'/images/banks/' + bank.name + '.png'" :alt="bank.name" class="tw-w-[38px] tw-h-auto"/>
            </ada-btn>
          </ada-toggle>
          <div class="tw-flex">
            <div class="tw-w-1/2 tw-ml-3">
              <ada-btn
                  class="tw-bg-transparent tw-text-primary tw-w-full tw-min-h-[36px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg tw-border tw-border-primary">
                {{ $t("accounting.depositReport") }}
              </ada-btn>
            </div>
            <div class="tw-w-1/2 tw-mr-3">
              <ada-btn
                  class="tw-bg-primary tw-text-white tw-w-full tw-min-h-[36px] tw-text-[10px] tw-px-3 tw-py-2 tw-rounded-lg">
                {{ $t("accounting.payment") }}
              </ada-btn>
            </div>
          </div>
        </div>
      </form>
      <div class="card">
        <ContentDoc :path="`${lang}/accounting/deposit`" class="doc"/>
      </div>
    </main>
  </div>
</template>
