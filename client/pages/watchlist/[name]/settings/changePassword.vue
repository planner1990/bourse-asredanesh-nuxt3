<script setup lang="ts">

import {Ref, ref} from 'vue';
import {useField, useForm} from "vee-validate";
import {PasswordType} from "~/types";

const router = useRouter();
const appManager = useAsrTrader();
const lang: string = appManager.locale.split("-")[0];
const amount = ref('');
const step = ref(1);
const min = ref(1);
const seconds = ref(59);
const fullTimer = ref("01:59");
const route = useRoute();
const showPassword: Ref<boolean> = ref(false);


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

function changeStep(steps: number) {
  step.value = steps;
}

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

      .change-password-2 {
        position: relative;

        input::placeholder {
          font-weight: 600;
          font-size: 12px;
          color: rgb(189, 189, 189);
        }

        input {
          padding-right: 16px;
        }

        i {
          position: absolute;
          left: 12px;
          top: 9px;
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
        <div>
          {{ $t("user.changePasswordFlag") }}
        </div>
        <div class="card_password tw-flex tw-justify-between">
          <div class="tw-text-gray3 tw-flex">
            {{ $t("user.password") }}:
            <div class="tw-text-black tw-font-extrabold tw-mt-1 tw-mr-2">**********</div>
          </div>
          <div class="tw-text-info tw-font-extrabold tw-text-s tw-cursor-pointer" @click="changeStep(2)">
            {{ $t("user.editPassword") }}
          </div>
        </div>
        <div class="card_password tw-flex tw-justify-between tw-mt-0">
          <div class="tw-text-gray3 tw-flex">{{ $t("user.twoSteps") }}:
            <div class="tw-text-black tw-font-extrabold tw-mr-2">{{ $t("user.disabled") }}</div>
          </div>
          <div class="tw-text-success tw-font-extrabold tw-text-s tw-cursor-pointer">{{ $t("user.activation") }}</div>
        </div>
      </div>


      <div class="card_step_2" v-if="step === 2">
        <img src="@/assets/images/change-password.png" alt="">
        <div class="tw-mt-4">کد پیامک شده به شماره ۹****۰۹۱۹۹۵ را وارد کنید</div>
        <div class="tw-w-full tw-mb-5 tw-mt-3 change-password">
          <input type="text" :placeholder="$t('user.smsCode')" class="tw-w-full tw-h-[42px] tw-rounded-lg"/>
          <div class="otp-code">
            <img src="@/assets/images/clock.png" alt="" class="tw-ml-3">
            <span class="tw-text-primary tw-text-base tw-font-bold tw-min-w-[40px]">{{ fullTimer }}</span>
          </div>
        </div>
        <ada-btn
            type="submit"
            tabindex="6"
            class="tw-h-[42px] tw-w-full tw-mb-[16px] tw-mt-[12px] tw-bg-primary tw-text-white ripple"
            @click="changeStep(3)"
        >
          {{ $t("user.confirmAndContinue") }}
        </ada-btn>
        <ada-btn
            tabindex="7"
            class="tw-h-[42px] tw-w-full tw-border tw-border-gray4 tw-text-gray3 tw-bg-transparent"
            @click="changeStep(1)"
        >
          {{ $t("user.back") }}
        </ada-btn>
      </div>


      <div class="card_step_2" v-if="step === 3">
        <img src="@/assets/images/change-password-2.png" class="tw-mb-4" alt="">

        <div class="tw-w-full tw-mb-3 tw-mt-3 change-password-2">
          <input
              :type="showPassword ? 'text' : 'password'"
              class="tw-w-full tw-h-[42px] tw-bg-white tw-rounded-lg"
              :placeholder="$t('user.newPassword')"
          />
          <ada-icon
              :size="24"
              class="tw-mx-1 tw-cursor-pointer"
              :color="showPassword ? 'primary' : null"
              @click.stop="showPassword = !showPassword"
          >
            {{ showPassword === true ? 'mdi-eye-off' : 'mdi-eye' }}
          </ada-icon>
        </div>

        <div class="tw-w-full tw-mb-5 tw-mt-3 change-password-2">
          <input
              :type="showPassword ? 'text' : 'password'"
              class="tw-w-full tw-h-[42px] tw-bg-white tw-rounded-lg"
              :placeholder="$t('user.repeatNewPassword')"
          />
          <ada-icon
              :size="24"
              class="tw-mx-1 tw-cursor-pointer"
              :color="showPassword ? 'primary' : null"
              @click.stop="showPassword = !showPassword"
          >
            {{ showPassword === true ? 'mdi-eye-off' : 'mdi-eye' }}
          </ada-icon>
        </div>

        <ada-btn
            type="submit"
            tabindex="6"
            class="tw-h-[42px] tw-w-full tw-mb-[16px] tw-mt-[12px] tw-bg-primary tw-text-white ripple"
            @click="changeStep(1)"
        >
          {{ $t("user.changePassword") }}
        </ada-btn>
        <ada-btn
            tabindex="7"
            class="tw-h-[42px] tw-w-full tw-border tw-border-gray4 tw-text-gray3 tw-bg-transparent"
            @click="changeStep(2)"
        >
          {{ $t("user.back") }}
        </ada-btn>
      </div>
    </section>
  </div>
</template>