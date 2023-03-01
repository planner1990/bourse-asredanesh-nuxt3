<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UploadableFile from "~/types/upload/UploadableFile";
import { useUploadAbleFile, useUser } from "~~/composables";
import { DateTime } from "luxon";

const i18n = useI18n();
const userManager = useUser();
const currentUser = computed(() => userManager.me);
const triggerUploadModal = ref<boolean>(false);
const uploadFile = useUploadAbleFile();
const files = ref<UploadableFile[]>([]);
const content = ref<any>(null);
const uploadDisabled = computed(() => content.value == null)

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
      try {
        content.value = JSON.parse(evt.target.result)
      } catch { content.value = null } finally { }
    });
  }
}

async function uploadSetting() {
  if (content.value != null) {
    userManager.update_settings({
      path: "/",
      value: content.value,
    }).finally(() => {
      content.value = null
      triggerUploadModal.value = false
    })
  }
}

</script>
<style lang="postcss" scoped>
.container {
  @apply tw-h-full;
  @apply tw-flex tw-flex-row tw-justify-center tw-items-center tw-text-center;

  >div {
    @apply tw-bg-gray-100 tw-border-2 tw-border-dashed tw-rounded tw-border-primary/50;
    @apply tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center;
    margin: 9px;
    width: calc(100% - 9px);
    height: calc(100% - 9px);

    .ada-button {
      @apply tw-mx-4 tw-my-2 tw-p-3;

      &.upload {
        @apply tw-bg-primary tw-text-white;

        &[disabled] {
          @apply tw-opacity-100 tw-bg-gray4 tw-text-black/30;
        }
      }

      &:hover {
        @apply tw-bg-primary/90 tw-text-white;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <div v-ada-drop-zone @uploaded_files="receive_files_uploaded">
      <ada-btn @click="downloadSettings">
        {{ i18n.t("general.download") }} {{ i18n.t("general.settings") }}
      </ada-btn>
      <ada-btn class="upload" @click="uploadSetting" :disabled="uploadDisabled">
        {{ i18n.t("general.upload") }} {{ i18n.t("general.settings") }}
      </ada-btn>
    </div>
  </div>
</template>