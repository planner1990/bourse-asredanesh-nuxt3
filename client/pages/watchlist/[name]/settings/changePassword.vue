<script setup lang="ts">

import {ref} from 'vue';

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('');
const step = ref(2);
const route = useRoute();

function goToDeposit() {
  router.push({path: `/watchlist/${route.params.name}/accounting/deposit`});
}
</script>

<style lang="postcss" scoped>
.tmp-ctr {
  @apply tw-bg-gray-100 tw-w-full tw-p-[12px];

  section {
    @apply tw-rounded-t-lg;

    .card {
      @apply tw-mx-auto tw-my-4 tw-flex tw-flex-wrap tw-justify-items-center tw-items-center tw-justify-center;
      width: 420px;

      &_password {
        @apply tw-bg-white tw-px-4 tw-mt-4 tw-mb-3 tw-rounded-lg tw-w-full tw-h-[40px];
        line-height: 40px;
      }
    }

    .card_step_2 {
      @apply tw-mx-auto tw-my-4 tw-flex tw-flex-wrap tw-justify-items-center tw-items-center tw-justify-center tw-flex-col;
      width: 420px;

      &_password {
        @apply tw-bg-white tw-px-4 tw-mt-4 tw-mb-3 tw-rounded-lg tw-w-full tw-h-[40px];
        line-height: 40px;
      }
    }
  }
}

</style>

<template>
  <div class="tmp-ctr">
    <section>
      <div class="card" v-if="step === 1">
        <img src="@/assets/images/lock.png" alt="">
        <div>شما میتوانید برای تغییر رمز عبور و گذر دو مرحله‌ای خود از این قسمت اقدام نمایید</div>
        <div class="card_password tw-flex tw-justify-between">
          <div class="tw-text-gray3 tw-flex">رمز عبور:
            <div class="tw-text-black tw-font-extrabold tw-mt-1 tw-mr-2">**********</div>
          </div>
          <div class="tw-text-info tw-font-extrabold tw-text-s tw-cursor-pointer">ویرایش رمز</div>
        </div>
        <div class="card_password tw-flex tw-justify-between tw-mt-0">
          <div class="tw-text-gray3 tw-flex">گذر دو مرحله‌ای:
            <div class="tw-text-black tw-font-extrabold tw-mt-1 tw-mr-2">غیر فعال است</div>
          </div>
          <div class="tw-text-success tw-font-extrabold tw-text-s tw-cursor-pointer">فعالسازی</div>
        </div>
      </div>
      <div class="card_step_2" v-if="step === 2">
        <img src="@/assets/images/change-password.png" alt="">
        <div class="tw-mt-4">کد پیامک شده به شماره ۹****۰۹۱۹۹۵ را وارد کنید</div>
        <div class="card_password tw-flex tw-justify-between">
          <div class="tw-text-gray3 tw-flex">رمز عبور:
            <div class="tw-text-black tw-font-extrabold tw-mt-1 tw-mr-2">**********</div>
          </div>
          <div class="tw-text-info tw-font-extrabold tw-text-s tw-cursor-pointer">ویرایش رمز</div>
        </div>
        <ada-btn
            type="submit"
            tabindex="6"
            class="tw-h-[42px] tw-w-full tw-my-[16px] tw-bg-primary tw-text-white ripple"
        >
          {{ $t("login.login") }}
        </ada-btn>
        <ada-btn
            tabindex="7"
            to="/registration"
            class="tw-h-[42px] tw-w-full tw-bg-white tw-border tw-border-gray3"
        >
          {{ $t("login.registration") }}
        </ada-btn>
      </div>
    </section>
  </div>
</template>