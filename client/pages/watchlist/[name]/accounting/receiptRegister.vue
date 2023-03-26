<script setup lang="ts">

import {ref} from 'vue';

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('')
const day = ref<string>('')
const month = ref<string>('')
const year = ref<string>('')
const route = useRoute();

function goToDeposit() {
  router.push({path: `/watchlist/${route.params.name}/accounting/deposit`});
}
</script>

<style lang="postcss" scoped>
.tmp-ctr {
  @apply tw-w-full tw-h-full;
}


.deposit {
  @apply tw-grid tw-grid-cols-2 tw-gap-[12px] tw-m-0 tw-p-[12px] tw-relative tw-bg-white;
  height: auto;

  &::before {
    content: "";
    @apply tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-bg-white;
    z-index: -1;
  }

  section {
    @apply tw-bg-white tw-rounded-lg tw-bg-grayF8;

    .card {
      @apply tw-p-[12px] tw-mx-auto tw-rounded-t-lg;
      max-width: 390px;
    }

    form.card {
      @apply tw-flex tw-flex-col;

      & > :first-child {
        @apply tw-flex tw-justify-between;

        .ada-input {
          width: 30.5%;

          & :deep(.scaffold) {
            @apply tw-border-gray4 tw-bg-white tw-h-[36px];
          }

          & :deep(.label) {
            @apply tw-text-gray2 tw-font-medium tw-text-sm;
            max-width: 95px;
          }

          &:nth-child(2) {
            @apply tw-flex tw-flex-col tw-items-start;

            & :deep(.input-container) {
              @apply tw-p-0 tw-justify-between tw-border tw-border-gray4 tw-rounded-lg tw-h-[36px] tw-bg-white;

              input {
                @apply tw-max-w-fit tw-mx-1 tw-text-black;

              }

              ::placeholder {
                @apply tw-text-gray4;
              }

              span {
                @apply tw-text-black/60;
              }

              &.active {
                @apply tw-border-primary;
              }
            }
          }

          &.active {
            & :deep(.scaffold) {
              @apply tw-border-primary;
            }
          }
        }
      }

      & > :nth-child(2) {
        @apply tw-flex tw-justify-between tw-mt-6;

        .ada-select {
          width: 48%;

          & :deep(.input) {
            @apply tw-border tw-border-gray4 tw-h-[36px] tw-rounded-lg;

          }
        }
      }

      & > :nth-child(3) {
        @apply tw-bg-info tw-bg-opacity-5 tw-my-6 tw-border tw-border-dashed tw-border-info tw-rounded-lg;

        .uploader {
          @apply tw-flex tw-px-10 tw-py-5 tw-cursor-pointer;

          div {
            @apply tw-flex tw-flex-col tw-mr-5;
          }
        }
      }

      & > :nth-child(4) {
        @apply tw-flex tw-justify-between;

        .ada-button {
          @apply tw-w-[48%];

          &:first-child {
            @apply tw-bg-transparent tw-border tw-text-primary tw-border-primary hover:tw-bg-primary hover:tw-text-white;
            font-size: 0.85rem !important;
          }

          &:nth-child(2) {
            @apply tw-bg-primary tw-text-white;
            font-size: 0.85rem !important;
          }
        }
      }
    }
  }

  footer {
    @apply tw-col-span-2;
  }
}

</style>

//TODO set in assetst css files // globally
<style lang="postcss">
.tmp-ctr {
  .uploader {
    &__icon {
      &--info {
        @apply tw-text-info tw-text-opacity-80;
      }
    }

    &__title {
      &--info {
        @apply tw-text-info;
      }
    }

    &__description {
      &--gray {
        @apply tw-text-gray3;
      }
    }

  }
}
</style>

<template>
  <div class="tmp-ctr">
    <main class="deposit">
      <section>
        <form class="card">
          <div>
            <ada-currency-input v-model="amount" :label="$t('accounting.depositAmount')"></ada-currency-input>
            <date-input v-model:day="day" v-model:month="month" v-model:year="year"
                        :label="$t('accounting.depositDate')"></date-input>
            <ada-input dir="rtl" type="number" :label="$t('accounting.receipt')"></ada-input>
          </div>
          <div>
            <select-box :placeholder="$t('accounting.brokerAccountNumber')"
                        class="tw-text-gray2 tw-font-medium tw-text-sm"></select-box>
            <select-box :placeholder="$t('accounting.reasonForDeposit')"
                        class="tw-text-gray2 tw-font-medium tw-text-sm"></select-box>
          </div>
          <div>
            <div class="uploader">
              <ada-icon class="uploader__icon--info" size="3.25rem">isax-document-upload-outline
              </ada-icon>
              <div>
                <h5 v-text="$t('accounting.upload')" class="uploader__title--info"></h5>
                <p v-text="$t('accounting.desUpload')" class="uploader__description--gray"></p>
              </div>
            </div>
          </div>
          <div>
            <ada-btn @click="goToDeposit" class="tw-h-[36px] tw-text-sm tw-font-semibold">
              {{ $t("accounting.depositReport") }}
            </ada-btn>
            <ada-btn class="tw-h-[36px] tw-text-sm tw-font-semibold">
              {{ $t("accounting.sendFile") }}
            </ada-btn>
          </div>
        </form>
      </section>

      <section>
        <div class="card">
          <!--          <ContentDoc :path="`${lang}/accounting/receiptRegister`" class="doc"/>-->
          <div class="tw-text-error">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
          </div>
          <div class="tw-text-gray3 tw-mt-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
          </div>
          <div class="tw-text-gray3 tw-mt-9">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
          </div>
        </div>
      </section>
      <!-- <footer class="tw-bg-info">rgrg</footer> -->
    </main>
  </div>
</template>
