<script lang="ts" setup>
import {Order, OrderSearchModel, PaginatedResult, TabItem} from "@/types";
import {useInstrument, useOrder} from "~~/composables";
import {watch} from "vue";

const list = defineAsyncComponent(
    () => import("@/components/bottom-panel/orders.vue")
);

const props = defineProps<{
  modelValue: TabItem;
  tabs: Array<TabItem>;
}>();

const orderManager = useOrder();
const route = useRoute();
const bottomPanel = useBottomPanel();

const key = ref(1)

const orders = reactive<{ items: Order[] }>({items: []});

watch(
    () => [route.query, orderManager.last_update],
    () => {
      getOrders(
          route.params.name && route.query.length
              ? route.query
              : {offset: 0, length: 20}
      );

    }
);


const instrumentManager = useInstrument();
const selected = computed(() => instrumentManager.state.selected);
const router = useRouter();
watch(
    selected,
    () => {
      if (selected.value) {
        router.push({
          path: `/watchlist/${route.params.name}/orders`,
          query: {offset: 0, length: 20, instId: selected.value.id}
        });
      } else {
        router.push({
          path: `/watchlist/${route.params.name}/orders`,
          query: {offset: 0, length: 20}
        });
      }
    }
);


async function getOrders(qu) {
  bottomPanel.setLoading(true);
  orders.items.splice(0, Infinity);
  await orderManager
      .getOrders(qu as OrderSearchModel)
      .then((res: PaginatedResult<Order> | undefined) => {
        if (res) orders.items.push(...res.data);
        bottomPanel.setLoading(false);
      });
}

getOrders(
    route.params.name && route.query.length
        ? route.query
        : {offset: 0, length: 20}
);
</script>
<template>
  <Transition name="page">
    <list v-if="orders.items.length" :orders="orders.items"></list>
  </Transition>
</template>
