<script setup lang="ts">
import { Ref } from "vue";
import { useUser } from "~/composables";
import { TabItem, Bookmark } from "~/types";

const props = withDefaults(
  defineProps<{
    autoRoute?: boolean;
  }>(),
  {
    autoRoute: false,
  }
);

const route = useRoute();
const router = useRouter();
const userManager = useUser();
const selected = computed(() => watchList.value.find((item) => item.id == route.params.name) ?? watchList.value[0]);
const isOpen: Ref<any> = ref(false);
const currentId: Ref<any> = ref();
const newName = ref("");
const watchList = computed<Array<any>>(() => {
  var tmp: Array<any> = reactive([]);
  Object.keys(userManager.watchList).forEach((k) => {
    tmp.push({
      onEdit: false,
      newName: k,
      text: k,
      id: k,
      to: "/watchList/" + decodeURIComponent(k),
    });
  });
  return tmp;
})

async function create() {
  if (!newName.value || newName.value == "") return;
  userManager.watchList[newName.value] = [];
  await userManager.update_settings({
    path: "/watch_lists/" + newName.value,
    value: [],
  });
  newName.value = "";
}

async function remove(name: string) {
  delete userManager.watchList[name]
  await userManager.delete_settings({
    path: "/watch_lists/" + name,
  });
  if (name == route.params.name) router.push(watchList.value[0].to);
}

async function rename(item: any) {
  Object.keys(userManager.watchList).forEach((i) => {
    userManager.watchList[item.newName] = userManager.watchList[item.id];
    delete userManager.watchList[item.id]
  });
  await userManager.update_settings({
    path: "/watch_lists",
    value: userManager.watchList,
  });
  if (item.id == route.params.name) router.push("/watchList/" + item.newName);
}

function select(val: any) {
  const fullPath = route.fullPath.split("/");
  if (props.autoRoute) {
    if (route.params.slug) val.to = val.to + `/${route.params.slug}`
    router.push(fullPath[3] ? val.to + "/" + fullPath[3] : val.to);
  }
}

watch(selected, select);

async function setBookmark(item: any) {
  if (userManager.getBookmarks.findIndex((i) => i.text === item.id) == -1) {
    const tempBookmark: Bookmark = {
      icon: "isax-graph",
      text: item.id,
      title: item.id,
      to: item.to,
    };
    userManager.getBookmarks.push(tempBookmark);
  } else {
    userManager.getBookmarks.splice(userManager.getBookmarks.findIndex((i) => i.text == item.id), 1)
  }
  await userManager.update_settings({
    path: "/bookmarks",
    value: userManager.getBookmarks
  });
}

function openSubMenu(item: TabItem) {
  if (item && item.id === currentId.value) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = true;
    currentId.value = item.id
  }
}
</script>

<style lang="postcss" scoped>
#btn-trash .icon {
  @apply tw-text-error;
}

#btn-edit .icon {
  @apply tw-text-info;
}

#btn-trash,
#btn-edit {
  @apply tw-bg-transparent tw-mx-[2px];
}
</style>

<style lang="postcss">
.ada-select-watchlist {
  @apply tw-bg-primary/10 tw-text-primary tw-h-[28px];
}

.menu {
  .watchlist-selector-input {
    @apply tw-ml-[6px] tw-w-[158px];
  }

  .verify-btn {
    @apply tw-w-14 tw-text-white tw-bg-success;

    .icon {
      @apply tw-text-white;
    }
  }

  .ada-input .scaffold {
    border: unset;
  }
}
</style>

<template>
  <select-box :value="selected" :placeholder="$t('watchList.title')" textPath="$.newName" id="watchlist-selector"
    class="ada-select-watchlist text-overflow-selector">
    <template #items>
      <ul class="tw-p-0 tw-m-0">
        <li v-for="(item, index) in watchList" :key="index" @click="select(item)"
          class="tw-p-2 tw-pl-3 hover:tw-bg-primary hover:tw-bg-opacity-10 tw-cursor-pointer tw-pb-0">
          <div class="tw-flex tw-flex-grow tw-justify-between tw-flex-wrap" v-if="!item.onEdit">
            <span class="text-overflow">{{ item.text }}</span>
            <div>
              <ada-icon :size="18" class="tw-text-primary" @click.stop="setBookmark(item)">
                {{
                  userManager.getBookmarks.findIndex((itm) => itm.text === item.text) != -1 ? "mdi-bookmark" :
                    "mdi-bookmark-outline"
                }}
              </ada-icon>
              <ada-icon :size="18" class="tw-text-primary" @click.stop="openSubMenu(item)"
                v-ada-click-outside="() => isOpen = false">
                mdi-dots-vertical
              </ada-icon>
            </div>
            <div v-if="isOpen && currentId === item.id" class="tw-flex tw-w-full tw-justify-end">
              <ada-btn id="btn-edit" class="tw-ml-6" key="edit" @click.stop="
                () => {
                  item.onEdit = true;
                }
              ">
                <ada-icon :size="16"> isax-edit-2</ada-icon>
              </ada-btn>
              <ada-btn key="delete" @click.stop="remove(item.id)" id="btn-trash" class="tw-ml-3">
                <ada-icon :size="16"> isax-trash</ada-icon>
              </ada-btn>
            </div>
          </div>
          <div class="tw-flex tw-flex-grow" v-else>
            <ada-input v-model="item.newName" activeBorder class="watchlist-selector-input"
              @keyup.enter.stop="() => rename(item)" @click.stop="">
            </ada-input>
            <ada-btn key="save" @click.stop="() => rename(item)" class="verify-btn">
              <ada-icon :size="16"> mdi-check</ada-icon>
            </ada-btn>
          </div>
          <div class="tw-border-b tw-border-[#E0E0E0] tw-mt-2"></div>
        </li>
      </ul>
    </template>
    <template #append-item>
      <ada-list class="tw-p-0 tw-m-0" @click.stop="">
        <div class="tw-text-[10px] tw-text-gray2 tw-mr-2">افزودن مورد دلخواه</div>
        <ada-list-item class="tw-px-2 tw-flex tw-items-center tw-mt-2 tw-mb-3" :value="{ icon: '', title: '' }">
          <ada-input class="tw-text-primary watchlist-selector-input" v-model="newName" @keyup.enter="create"
            placeholder="نام دلخواه">
          </ada-input>
          <ada-btn @click.stop="create" class="tw-bg-primary tw-min-w-[32px]">
            <ada-icon :size="16" class="tw-text-white"> mdi-plus</ada-icon>
          </ada-btn>
        </ada-list-item>
      </ada-list>
    </template>
  </select-box>
</template>
