<script setup lang="ts">
import ProfilePicture from "@/components/sso/profilePicture.vue";
import { useLoading } from "~~/composables";
import { useUser } from "~/composables";

const loading = useLoading()
const router = useRouter();
const userManager = useUser();
const currentUser = computed(() => userManager.me);
const route = useRoute();
const logOutConfirmation = ref(false);

async function doLogout() {
  loading.showLoading(true)
  userManager.update_settings({
    path: "/home",
    value: route.fullPath
  }).finally(() => {
    loading.showLoading(false)
  })
  userManager.doLogout();
  router.push("/login");
}

const showConfirmation = (): void => {
  logOutConfirmation.value = true;
};


function goToProfile() {
  router.push(`/watchlist/${route.params.name}/settings`);
}



defineExpose({
  ProfilePicture,
  currentUser,
});
</script>

<style lang="postcss" scoped>
.userMenu>div:first-child {
  @apply tw-flex tw-justify-center tw-items-center
}

.mdi-power-standby {
  @apply tw-bg-error tw-bg-opacity-10;
  border-radius: 50%;
  width: 29px;
  height: 29px;
}

.dialog-delete {
  width: 40vw;
  font-family: "Iran Sans X FaNum", sans-serif !important;

  .ada-button {
    @apply tw-text-white tw-w-16;

    &:first-child {
      @apply tw-bg-info tw-bg-opacity-80;
    }

    &:last-child {
      @apply tw-bg-error tw-mr-2 tw-bg-opacity-90;
    }

    &:hover {
      @apply tw-bg-opacity-100;
    }
  }
}
</style>

<template>
  <div class="userMenu tw-flex tw-items-center tw-ml-5">
    <ada-btn :height="28" min-width="184px" depressed @click="goToProfile">
      <profile-picture :address="currentUser.profile && currentUser.profile.profilePic" />
      <span class="tw-mr-2 tw-font-semibold" v-text="
        currentUser.profile.nickname
          ? currentUser.profile.nickname
          : currentUser.userName
      "></span>
    </ada-btn>
    <div class="tw-cursor-pointer tw-mr-6" @click="showConfirmation">
      <ada-icon :size="18" class="tw-text-error tw-cursor-pointer">
        mdi-power-standby
      </ada-icon>
    </div>
    <lazy-ada-dialog :active="logOutConfirmation">
      <div class="dialog-delete">
        <h5 v-text="$t('general.alert')"></h5>
        <p v-text="$t('instrument.logOut')"></p>
        <footer class="tw-flex tw-items-center tw-p-2">
          <ada-btn dark :width="65" @click.stop.prevent="
            () => {
              doLogout();
              logOutConfirmation = false;
            }
          ">
            {{ $t("general.yes") }}
          </ada-btn>
          <ada-btn dark :width="65" @click.stop.prevent="
            () => {
              logOutConfirmation = false;
            }
          ">
            {{ $t("general.no") }}
          </ada-btn>
        </footer>
      </div>
    </lazy-ada-dialog>
  </div>
</template>
