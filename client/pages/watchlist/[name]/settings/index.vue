<script setup lang="ts"></script>

<style lang="postcss">
.setting-container {
  @apply tw-w-full tw-h-full tw-p-3;

  .setting {
    @apply tw-h-full tw-flex tw-flex-wrap;

    > div {
      @apply lg:tw-w-[48%] md:tw-w-full lg:tw-mr-0 md:tw-mr-4 tw-p-6 tw-rounded-lg;

      .setting-account-information {
        @apply tw-w-2/5 tw-h-7 tw-mb-7 tw-text-base tw-font-normal tw-text-gray3 tw-bg-white tw-h-[40px] tw-leading-[40px] tw-rounded-lg tw-pr-4 tw-min-w-[290px];

        i {
          @apply tw-text-primary tw-ml-1;
        }

        span {
          @apply tw-text-black tw-text-base tw-font-bold;
        }
      }
    }

    > div:last-child {
      i {
        @apply tw-text-primary;
        position: absolute;
        right: -26px;
        top: -14px;
      }
    }
  }
}

</style>

<template>
  <div class="setting-container">
    <div class="setting">
      <div class="tw-bg-[#f8f8f8]">
        <div class="setting-account-information">
          <ada-icon :size="20">isax-frame-bold</ada-icon>
          {{ $t('user.profile.fullName') }}: <span> حسین لطفی</span>
        </div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-scan-bold</ada-icon>
          {{ $t('user.profile.ExchangeCode') }}: <span> لطف ۳۴۵۶۷۸۹</span>
        </div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-sms-bold</ada-icon>
          {{ $t('user.profile.email') }}: <span> test-bours@gmail.com</span>
        </div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-call-bold</ada-icon>
          {{ $t('user.profile.cellPhone') }}: <span>۰۹۱۲۰۶۶۵۵۴۵۸</span>
        </div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-user-octagon-bold</ada-icon>
          {{ $t('user.profile.username') }}: <span> ilotfi</span>
        </div>
      </div>
      <div class="tw-bg-[#f8f8f8] tw-mr-3">
        <div class="tw-text-primary tw-text-base tw-font-bold tw-mr-8"> {{ $t('user.profile.message') }}:</div>
        <div class="tw-mb-7 tw-relative tw-text-base tw-font-normal tw-text-gray3 tw-mx-9 tw-mr-8">
          <ada-icon :size="20">isax-message-tick-bold</ada-icon>
          باتوجه به الزام واحد‌امنیت سازمان بورس و در راستای ارتقای امنیت خدمت‌رسانی به مشتریان و پیشگیری از عواقب
          سرقت اطلاعات ورود کاربر، امکان ورود به سامانه معاملات آنلاین از طریق رمز عبور یکبار مصرف (پویا) فراهم آمده
          است.
        </div>
        <div class="tw-text-primary tw-text-base tw-font-bold tw-mr-8"> {{ $t('user.profile.otp') }}:</div>
        <div class="tw-relative tw-text-base tw-font-normal tw-text-gray3 tw-ml-8 tw-mr-8">
          <ada-icon :size="20">isax-shield-tick-bold</ada-icon>
          باتوجه به الزام واحد‌امنیت سازمان بورس و در راستای ارتقای امنیت خدمت‌رسانی به مشتریان و پیشگیری از عواقب
          سرقت اطلاعات ورود کاربر، امکان ورود به سامانه معاملات آنلاین از طریق رمز عبور یکبار مصرف (پویا) فراهم آمده
          است.
        </div>
      </div>
    </div>
  </div>
</template>