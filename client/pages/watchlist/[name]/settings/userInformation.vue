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
  @apply tw-bg-gray-100 tw-w-full tw-h-full tw-p-[16px];

  section {
    @apply tw-bg-white tw-rounded-t-lg;

    .card {
      @apply tw-p-[24px] tw-mx-auto tw-rounded-t-lg tw-flex tw-flex-wrap tw-justify-items-center tw-items-center tw-justify-between;
    //max-width: 390px;

      div {
        width: 30.5%;
        max-width: 332px;
        background-color: #00BD79;
        border: 1px solid;
      }
    }
  }
}

</style>

<template>
  <div class="tmp-ctr">
    <section>
      <form class="card">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </form>
    </section>
  </div>
</template>