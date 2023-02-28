<script setup lang="ts">

import {ref} from 'vue';

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('');
const route = useRoute();
const img = ref("/assets/images/Rectangle-493.png");
</script>

<style lang="postcss">

.financialInfo-container {
  @apply tw-w-full tw-p-3 tw-flex tw-h-full;

  .financialInfo {
    @apply tw-bg-[#f8f8f8] tw-rounded-lg tw-h-full;

    div {
      @apply lg:tw-w-full md:tw-w-full tw-m-auto tw-text-center tw-p-6 tw-content-start tw-flex-wrap tw-max-w-[330px];
      line-height: 5px;
    }

    .financialInfo_avatar {
      @apply tw-rounded-full tw-flex tw-flex-nowrap tw-justify-center tw-items-center tw-mt-[43px];
      width: 70px !important;
      height: 70px;

      img {
        width: 86px !important;
        height: 86px;
        max-width: 86px !important;
        margin-bottom: 4px;
      }
    }
  }
}

</style>

<template>
  <div class="financialInfo-container">
    <div class="financialInfo" style="width: 50%; margin-left: 12px">
      <div class="tw-items-center">
        <div class="tw-w-1/3 financialInfo_avatar">
          <img src="@/assets/images/Rectangle-493.png" alt="">
        </div>
        <div class="tw-w-2/3 tw-pr-8">
          <div class="tw-py-0 tw-text-xl tw-text-primary tw-font-semibold">حسین لطفی</div>
          <div class="tw-text-base tw-text-gray2 tw-font-normal"> {{ $t('user.profile.ExchangeCode') }}: لط ۱۲۳۵۳۰</div>
        </div>
      </div>
    </div>


    <div class="financialInfo" style="width: 50%">

        <div class="tw-text-gray3 tw-bg-white tw-rounded-lg tw-flex tw-justify-between tw-mb-5 tw-mt-7">
          {{ $t('user.profile.customerBalance') }}: <span class="tw-text-black tw-mr-9">۱۰۰.۰۰۰.۰۰۰ ریال</span>
        </div>
        <div class="tw-text-gray3 tw-bg-white tw-rounded-lg tw-flex tw-justify-between tw-mb-5">
          {{ $t('user.profile.accumulated') }}: <span class="tw-text-black tw-mr-9">۱۰۰.۰۰۰.۰۰۰ ریال</span>
        </div>
        <div class="tw-text-gray3 tw-bg-white tw-rounded-lg tw-flex tw-justify-between tw-mb-5">
          {{ $t('user.profile.creditAmount') }}: <span
            class="tw-text-black tw-mr-9">۰ ریال</span></div>
        <div class="tw-text-error tw-bg-white tw-rounded-lg tw-flex tw-justify-between tw-mb-5">
          {{$t('user.profile.blocked')}}: <span class="tw-text-black tw-mr-9">۰ ریال</span>
        </div>
        <div class="tw-text-success tw-bg-white tw-rounded-lg tw-flex tw-justify-between tw-mb-5">
          {{ $t('user.profile.purchasingPower') }}: <span class="tw-text-black tw-mr-9">۱۲۰.۰۰۰.۰۰۰ ریال</span>
        </div>
    </div>
  </div>
</template>
