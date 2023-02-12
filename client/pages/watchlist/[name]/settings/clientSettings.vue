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
const content = ref(null);

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

</script>
<style lang="postcss" scoped>
.container {
  @apply tw-h-full tw-w-full tw-rounded-lg;
  @apply tw-flex tw-flex-row tw-justify-center tw-items-center tw-text-center;

  .ada-button {
    @apply tw-mx-4 tw-p-3;

    &:hover {
      @apply tw-bg-primary tw-text-white;
    }
  }
}
</style>
<template>
  <div class="container">
    <ada-btn @click="downloadSettings">
      {{ i18n.t("general.download") }} {{ i18n.t("general.settings") }}
    </ada-btn>
    <ada-btn>
      {{ i18n.t("general.upload") }} {{ i18n.t("general.settings") }}
    </ada-btn>
  </div>
</template>