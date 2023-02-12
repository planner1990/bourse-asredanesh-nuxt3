<script setup lang="ts">

import {ref} from 'vue';

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('');
const step = ref(2);
const min = ref(1);
const seconds = ref(59);
const fullTimer = ref("01:59");
const route = useRoute();

function goToDeposit() {
  router.push({path: `/watchlist/${route.params.name}/accounting/deposit`});
}


let timer = setInterval(() => {
  seconds.value--;
  if (seconds.value === 0 && min.value === 1) {
    min.value = 0;
    seconds.value = 59;
  } else if (seconds.value === 0 && min.value === 0) {
    return fullTimer.value = "00 : 00";
  }
  fullTimer.value = "0" + min.value + ":" + seconds.value;
}, 1000);

watch(seconds, () => {
  if (seconds.value === 0 && min.value === 0) {
    clearInterval(timer);
  }
});
onMounted(() => {
  timer;
});

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

      .change-password {
        position: relative;

        input::placeholder {
          font-weight: 600;
          font-size: 12px;
          color: rgb(189, 189, 189);
        }

        input {
          padding-right: 16px;
        }

        .otp-code {
          width: 100px;
          height: 34px;
          background-color: rgba(53, 84, 209, 0.1);
          position: absolute;
          top: 4px;
          left: 4px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding-right: 8px;
        }
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
        <div class="tw-w-full tw-mb-5 tw-mt-3 change-password">
          <input type="text" placeholder="کد پیامک شده" class="tw-w-full tw-h-[42px] tw-rounded-lg"/>
          <div class="otp-code">
            <img src="@/assets/images/clock.png" alt="" class="tw-ml-3">
            <span class="tw-text-primary tw-text-base tw-font-bold tw-min-w-[40px]">{{ fullTimer }}</span>
          </div>
        </div>
        <ada-btn
            type="submit"
            tabindex="6"
            class="tw-h-[42px] tw-w-full tw-mb-[16px] tw-mt-[12px] tw-bg-primary tw-text-white ripple"
        >
          تایید و ادامه
        </ada-btn>
        <ada-btn
            tabindex="7"
            class="tw-h-[42px] tw-w-full tw-border tw-border-gray4 tw-text-gray3 tw-bg-transparent"
        >
          بازگشت
          <!--          {{ $t("login.registration") }}-->
        </ada-btn>
      </div>
    </section>
  </div>
</template>