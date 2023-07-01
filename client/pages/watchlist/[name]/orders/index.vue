<script lang="ts" setup>
import {Order, OrderSearchModel, PaginatedResult, TabItem} from "@/types";
import {useDraft, useInstrument, useOrder} from "~~/composables";

const list = defineAsyncComponent(
    () => import("@/components/bottom-panel/orders.vue")
);

const props = defineProps<{
  modelValue: TabItem;
  tabs: Array<TabItem>;
}>();

const orderManager = useOrder();
const draft = useDraft();
const route = useRoute();
const bottomPanel = useBottomPanel();
const key = ref(1)
const orders = reactive<{ items: Order[] }>({items: []});


watch(
    () => [route.query, orderManager.last_update],
    () => {
      getOrders(
          route.params.name && route.query.length
              ? route.query as any as OrderSearchModel
              : {offset: 0, length: 20} as OrderSearchModel
      );

    }
);

watch(
    () => [draft.resetGetOrders],
    () => {
      if (draft.resetGetOrders === true) {
        getOrders(
            route.params.name && route.query.length
                ? route.query as any as OrderSearchModel
                : {offset: 0, length: 20} as OrderSearchModel
        );
      }


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
          query: {...route.query, instId: selected.value.id}
        });
      } else {
        router.push({
          path: `/watchlist/${route.params.name}/orders`,
          query: {offset: 0, length: 20, flags: route.query.flags}
        });
      }
    }
);


async function getOrders(qu: OrderSearchModel) {
  bottomPanel.setLoading(true);
  orders.items.splice(0, Infinity);
  await orderManager
      .getOrders(qu)
      .then((res: PaginatedResult<Order> | undefined) => {
        if (res) {
          orders.items.push(...res.data);
        }
        bottomPanel.setLoading(false);
      });
}

getOrders(
    route.params.name && route.query.length
        ? route.query as any as OrderSearchModel
        : {offset: 0, length: 20} as OrderSearchModel
);

// watch(draft, () => {
//   if (draft.resetGetOrders === true) {
//     // getOrders();
//   }
// })
</script>
<template>
  <list v-if="orders.items.length" :orders="orders.items"></list>
</template>
