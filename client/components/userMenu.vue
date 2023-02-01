<script setup lang="ts">
import ProfilePicture from "@/components/sso/profilePicture.vue";
import UploadableFile from "~/types/upload/UploadableFile";
import { useUploadAbleFile } from "~~/composables";

import { InstrumentCache, MenuItem } from "~/types";
import { useUser } from "~/composables";
import { DateTime } from "luxon";

const router = useRouter();
const userManager = useUser();
const userMenu = ref(false);
const triggerUploadModal = ref<boolean>(false);
const currentUser = computed(() => userManager.me);
const uploadFile = useUploadAbleFile();
const files = ref<UploadableFile[]>([]);
const content = ref(null);
const route = useRoute();
const logOutConfirmation = ref(false);

const userMenuItems: Array<MenuItem> = [
  {
    icon: "mdi-account-cog",
    to: `/watchlist/${route.params.name}/settings/userInformation`,
    title: "menu.profile",
  },
  {
    icon: "mdi-download",
    title: "menu.saveSettings",
    click: downloadSettings,
    color: "info",
  },
  {
    icon: "mdi-upload",
    title: "menu.uploadSettings",
    click: () => (triggerUploadModal.value = true),
    color: "info",
  },
  {
    icon: "mdi-logout",
    color: "error",
    click: doLogout,
    title: "login.logout",
  },
];

function doLogout() {
  userMenu.value = false;
  userManager.doLogout();
  router.push("/login");
}

const showConfirmation = (): void => {
  logOutConfirmation.value = true;
};


function goToProfile() {
  const route = useRoute();
  router.push(`/watchlist/${route.params.name}/settings`);
}

function downloadSettings() {
  const settings = URL.createObjectURL(
    new Blob([JSON.stringify(userManager.me.settings)], {
      type: "application/json",
    })
  );
  const a = document.createElement("a");
  a.href = settings;
  a.download =
    currentUser.value.userName +
    "-settings-" +
    DateTime.now().toISO() +
    ".json";
  a.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
}

function receive_files_uploaded(e: any) {
  files.value = e.detail.value;
  const { readerTextFile } = uploadFile;
  if (
    files.value[0].file.type.indexOf("text") == 0 ||
    files.value[0].file.type === "application/json"
  ) {
    readerTextFile(files.value[0].file, (evt) => {
      content.value = evt.target.result;
    });
  }
}

function removeFile(file: UploadableFile): void {
  const index = files.value.indexOf(file);
  if (index > -1) files.value.splice(index, 1);
}

async function uploadSetting() {
  if (content.value) {
    await userManager.update_settings({
      path: "/",
      value: JSON.parse(content.value),
    });
    triggerUploadModal.value = false
  }
}

defineExpose({
  ProfilePicture,
  currentUser,
  userMenu,
  userMenuItems,
});
//TODO
const me = () => {
  console.log("me");
};
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
