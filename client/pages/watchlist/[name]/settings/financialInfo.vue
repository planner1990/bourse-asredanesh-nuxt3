<script setup lang="ts">

import {ref} from 'vue';

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('');
const route = useRoute();
import avatar from "../../../../assets/images/Rectangle 493.png";
</script>

<style lang="postcss">

.financialInfo-container {
  @apply tw-w-full tw-h-full tw-p-3;

  .financialInfo {
    @apply tw-bg-gray8 tw-bg-gray8 tw-h-full tw-flex lg:tw-flex-nowrap md:tw-flex-wrap;

    div {
      @apply lg:tw-w-full md:tw-w-full lg:tw-mr-0 md:tw-mr-4 tw-p-6 tw-flex tw-content-start tw-flex-wrap;
    }

    .financialInfo_avatar {
      @apply tw-rounded-full tw-flex tw-flex-nowrap tw-justify-center tw-items-center;
      width: 70px !important;
      height: 70px;

      img {
        width: 70px !important;
        height: 70px;
        max-width: 70px !important;
        margin-bottom: 4px;
      }
    }
  }
}

</style>

<template>
  <div class="financialInfo-container">
    <div class="financialInfo">
      <div class=" tw-flex tw-items-center">
        <div class="tw-w-1/3 financialInfo_avatar">
          <img :src="avatar" alt="">
        </div>
        <div class="tw-w-2/3 tw-pr-0 tw-mt-4">
          <div class="tw-py-0 tw-text-xl tw-text-primary tw-font-semibold">حسین لطفی</div>
          <div class="tw-text-base tw-text-gray2 tw-font-normal">کد بورسی: لط ۱۲۳۵۳۰</div>
        </div>

      </div>
      <div>
        <div class="tw-text-gray3">مانده مشتری: <span class="tw-text-black tw-mr-9">۱۰۰.۰۰۰.۰۰۰ ریال</span></div>
        <div class="tw-text-gray3">جمع مانده: <span class="tw-text-black tw-mr-9">۱۰۰.۰۰۰.۰۰۰ ریال</span></div>
      </div>
      <div>
        <div class="tw-text-gray3">مبلغ اعتبار: <span class="tw-text-black tw-mr-9">۰ ریال</span></div>
        <div class="tw-text-error">بلوکه شده: <span class="tw-text-black tw-mr-9">۰ ریال</span></div>
      </div>
      <div>
        <div class="tw-text-success">قدرت خرید: <span class="tw-text-black tw-mr-9">۱۲۰.۰۰۰.۰۰۰ ریال</span></div>
      </div>
    </div>
  </div>
</template>
