<script setup lang="ts">
import ProfilePicture from "@/components/sso/profilePicture.vue";
import UploadableFile from "~/types/upload/UploadableFile";
import {useUploadAbleFile} from "~~/composables";

import {InstrumentCache, MenuItem} from "~/types";
import {useUser} from "~/composables";
import {DateTime} from "luxon";

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
  router.push(`/watchlist/${route.params.name}/settings/userInformation`);
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
  const {readerTextFile} = uploadFile;
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
.userMenu > div:first-child {
  @apply tw-flex tw-justify-center tw-items-center
}

.user-menu-activator {
  @apply tw-ml-14 tw-flex tw-justify-start tw-relative;

  &::before {
    background-color: var(--c-primary-rgb) !important;
  }
}

.dialog-upload {
  @apply tw-w-[600px] tw-px-3;

  #uploader {
    @apply tw-bg-info tw-bg-opacity-5 tw-border tw-border-dotted tw-border-info tw-rounded-lg tw-mx-auto;
    @apply tw-w-11/12 tw-my-6;
    min-height: 115px;

    .uploader {
      @apply tw-flex tw-px-10 tw-py-5 tw-cursor-pointer;

      .icon {
        @apply tw-text-info tw-text-opacity-70;
      }

      &__title {
        &--info {
          @apply tw-text-info;
        }
      }

      &__description {
        @apply tw-flex tw-flex-col tw-mr-5;

        &--gray {
          @apply tw-text-gray-400;
        }
      }

      &__file {
        @apply tw-relative tw-rounded tw-border tw-border-info tw-border-opacity-70 tw-flex tw-flex-col tw-items-center tw-p-2 tw-mx-1;

        &__close {
          @apply tw-absolute tw-left-1 tw-top-1 tw-w-7 tw-h-7 tw-bg-info tw-bg-opacity-10 hover:tw-bg-info;
          line-height: 1;

          &:hover {
            .icon {
              @apply tw-text-white;
            }
          }
        }

        &__name {
          max-width: 96px;
          min-width: 96px;
          @apply tw-overflow-clip tw-text-ellipsis tw-whitespace-nowrap tw-text-center;
        }
      }
    }
  }

  footer {
    .ada-button {
      @apply tw-w-20  tw-text-white;

      &:first-child {
        @apply tw-bg-success tw-bg-opacity-90 tw-mr-6;
      }

      &:nth-child(2) {
        @apply tw-bg-error tw-bg-opacity-90 tw-mr-3;
      }

      &:hover {
        @apply tw-bg-opacity-100;
      }
    }
  }
}
.mdi-power-standby {
  @apply tw-bg-primary tw-bg-opacity-10;
  border-radius: 50%;
  width: 29px;
  height: 29px;
}

.dialog-delete {
  width: 40vw;
  font-family: "Iran Sans X FaNum",sans-serif !important;

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
      <profile-picture
          :address="currentUser.profile && currentUser.profile.profilePic"
      />
      <span
          class="tw-mr-2 tw-font-semibold"
          v-text="
           currentUser.profile.nickname
             ? currentUser.profile.nickname
             : currentUser.userName
         "
      ></span>
    </ada-btn>
    <div
        class="tw-cursor-pointer tw-mr-6"
        @click="showConfirmation"
    >
      <ada-icon :size="18" class="tw-text-primary tw-cursor-pointer">
        mdi-power-standby
      </ada-icon>
    </div>
    <lazy-ada-dialog :active="logOutConfirmation">
      <div class="dialog-delete">
        <h5 v-text="$t('general.alert')"></h5>
        <p v-text="$t('instrument.logOut')"></p>
        <footer class="tw-flex tw-items-center tw-p-2">
          <ada-btn
              dark
              :width="65"
              @click.stop.prevent="
              () => {
                doLogout();
                logOutConfirmation = false;
              }
            "
          >
            {{ $t("general.yes") }}
          </ada-btn>
          <ada-btn
              dark
              :width="65"
              @click.stop.prevent="
              () => {
                logOutConfirmation = false;
              }
            "
          >
            {{ $t("general.no") }}
          </ada-btn>
        </footer>
      </div>
    </lazy-ada-dialog>

    <!--    <ada-menu :mTop="42" :mLeft="43" :active="userMenu">-->
    <!--      <template #activator>-->
    <!--        <ada-btn-->
    <!--            :height="28"-->
    <!--            min-width="184px"-->
    <!--            class="user-menu-activator tw-py-0 tw-px-2"-->
    <!--            color="transparent"-->
    <!--            depressed-->
    <!--            @click="userMenu = !userMenu"-->
    <!--            v-ada-click-outside="() => (userMenu = false)"-->
    <!--        >-->
    <!--          <profile-picture-->
    <!--              :address="currentUser.profile && currentUser.profile.profilePic"-->
    <!--          />-->
    <!--          <span-->
    <!--              class="tw-mr-2 tw-font-semibold"-->
    <!--              v-text="-->
    <!--              currentUser.profile.nickname-->
    <!--                ? currentUser.profile.nickname-->
    <!--                : currentUser.userName-->
    <!--            "-->
    <!--          ></span>-->
    <!--        </ada-btn>-->
    <!--      </template>-->
    <!--      <template #items>-->
    <!--        <ada-list class="tw-p-0 tw-m-0">-->
    <!--          <ada-list-item-->
    <!--              v-for="item in userMenuItems"-->
    <!--              :key="item.title"-->
    <!--              :to="item.to"-->
    <!--              :value="item"-->
    <!--              class="hover:tw-bg-gray-200"-->
    <!--          >-->
    <!--            <template #item="{ value }">-->
    <!--              <div-->
    <!--                  class="tw-cursor-pointer tw-w-full"-->
    <!--                  @click="-->
    <!--                  () => {-->
    <!--                    if (item.click) item.click();-->
    <!--                  }-->
    <!--                "-->
    <!--              >-->
    <!--                <ada-icon :color="value.color" :size="16">{{-->
    <!--                    value.icon-->
    <!--                  }}-->
    <!--                </ada-icon>-->
    <!--                <span v-text="$t(value.title)"></span>-->
    <!--              </div>-->
    <!--            </template>-->
    <!--          </ada-list-item>-->
    <!--        </ada-list>-->
    <!--      </template>-->
    <!--    </ada-menu>-->
  </div>
  <!--  <lazy-ada-dialog :active="triggerUploadModal">-->
  <!--    <div class="dialog-upload">-->
  <!--      <body>-->
  <!--      <div-->
  <!--          id="uploader"-->
  <!--          v-ada-drop-zone-->
  <!--          @uploaded_files="receive_files_uploaded"-->
  <!--      >-->
  <!--        <div class="uploader">-->
  <!--          <TransitionGroup name="slide-fade">-->
  <!--            <template v-if="!files.length">-->
  <!--              <ada-icon class="uploader__icon&#45;&#45;info" size="3.25rem"-->
  <!--              >isax-document-upload-outline-->
  <!--              </ada-icon-->
  <!--              >-->
  <!--              <div class="uploader__description">-->
  <!--                <h5-->
  <!--                    v-text="$t('accounting.upload')"-->
  <!--                    class="uploader__title&#45;&#45;info"-->
  <!--                ></h5>-->
  <!--                <p-->
  <!--                    v-text="$t('accounting.desUpload')"-->
  <!--                    class="uploader__description&#45;&#45;gray"-->
  <!--                ></p>-->
  <!--              </div>-->
  <!--            </template>-->
  <!--            <template v-else>-->
  <!--              <div-->
  <!--                  class="uploader__file"-->
  <!--                  v-for="file in files"-->
  <!--                  :key="file.id"-->
  <!--              >-->
  <!--                <ada-btn-->
  <!--                    class="uploader__file__close"-->
  <!--                    @click.stop="removeFile(file)"-->
  <!--                >-->
  <!--                  <ada-icon size="1rem">mdi-close</ada-icon>-->
  <!--                </ada-btn>-->
  <!--                <ada-icon size="3rem" class="uploader__file__icon"-->
  <!--                >mdi-file-document-->
  <!--                </ada-icon-->
  <!--                >-->
  <!--                <span-->
  <!--                    class="uploader__file__name"-->
  <!--                    v-text="file.file.name"-->
  <!--                ></span>-->
  <!--              </div>-->
  <!--            </template>-->
  <!--          </TransitionGroup>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      </body>-->
  <!--      &lt;!&ndash; <p v-text="$t('instrument.remove')"></p> &ndash;&gt;-->
  <!--      <footer class="tw-flex tw-items-center tw-p-2">-->
  <!--        <ada-btn-->
  <!--            :disabled="!files.length"-->
  <!--            dark-->
  <!--            :width="65"-->
  <!--            @click.stop.prevent="uploadSetting"-->
  <!--        >-->
  <!--          {{ $t("general.upload") }}-->
  <!--        </ada-btn>-->
  <!--        <ada-btn dark :width="65" @click.stop="triggerUploadModal = false">-->
  <!--          {{ $t("general.cancellation") }}-->
  <!--        </ada-btn>-->
  <!--      </footer>-->
  <!--    </div>-->
  <!--  </lazy-ada-dialog>-->
</template>
