<script setup lang="ts"></script>

<style lang="postcss">
.setting-container {
  @apply tw-w-full tw-h-full tw-p-3;

  .setting {
    @apply tw-h-full tw-bg-gray8 tw-flex tw-flex-wrap;

    > div {
      @apply lg:tw-w-1/2 md:tw-w-full lg:tw-mr-0 md:tw-mr-4 tw-p-6 tw-flex tw-content-start tw-flex-wrap;

      .setting-account-information {
        @apply tw-w-1/2 tw-h-7 tw-mb-7 tw-text-base tw-font-normal tw-text-gray3;

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
        right: -27px;
        top: -14px;
      }
    }
  }
}

</style>

<template>
  <div class="setting-container">
    <div class="setting">
      <div>
        <div class="setting-account-information">
          <ada-icon :size="20">mdi-account</ada-icon>
          نام و نام خانوادگی: <span> حسین لطفی</span></div>
        <div class="setting-account-information">
          <ada-icon :size="20" >isax-scan-bold</ada-icon>
          کدبورسی: <span> لطف ۳۴۵۶۷۸۹</span></div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-sms-bold</ada-icon>
          ایمیل: <span> test-bours@gmail.com</span></div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-call-bold</ada-icon>
          تلفن همراه: <span>۰۹۱۲۰۶۶۵۵۴۵۸</span></div>
        <div class="setting-account-information">
          <ada-icon :size="20">isax-user-octagon-bold</ada-icon>
          نام کاربری: <span> ilotfi</span></div>
      </div>
      <div>
        <div class="tw-text-primary tw-text-base tw-font-bold"> پیامک:</div>
        <div class="tw-mb-7 tw-relative tw-text-base tw-font-normal tw-text-gray3">
          <ada-icon :size="20">isax-message-tick-bold</ada-icon>
          باتوجه به الزام واحد‌امنیت سازمان بورس و در راستای ارتقای امنیت خدمت‌رسانی به مشتریان و پیشگیری از عواقب
          سرقت اطلاعات ورود کاربر، امکان ورود به سامانه معاملات آنلاین از طریق رمز عبور یکبار مصرف (پویا) فراهم آمده
          است.
        </div>
        <div class="tw-text-primary tw-text-base tw-font-bold"> خدمات OTP:</div>
        <div class="tw-relative tw-text-base tw-font-normal tw-text-gray3">
          <ada-icon :size="20">isax-shield-tick-bold</ada-icon>
          باتوجه به الزام واحد‌امنیت سازمان بورس و در راستای ارتقای امنیت خدمت‌رسانی به مشتریان و پیشگیری از عواقب
          سرقت اطلاعات ورود کاربر، امکان ورود به سامانه معاملات آنلاین از طریق رمز عبور یکبار مصرف (پویا) فراهم آمده
          است.
        </div>
      </div>
    </div>
  </div>
</template>