import { defineStore } from "pinia";
import {
  InstrumentCache,
  InstrumentSearchModel,
  Order,
  OrderClass,
  OrderSearchModel,
  PaginatedResult,
  Side,
  Wealth,
} from "~/types";
import { useInstrument, useAxios, useWealth, useUser, useLoading } from "..";
import orderManager from "@/repositories/wealth/order_manager";
import { Ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export const useOrder = defineStore("order", () => {
  const userState = useUser();
  const axios = useAxios();
  const instrumentManager = useInstrument();
  const wealthManager = useWealth();
  const orderFormCache: { [key: string]: Ref<Order> } = {};
  const last_update: string = new Date().toISOString();
  const loading = useLoading();
  const route = useRoute();
  const router = useRouter();

  /////////////////

  function getForm(id: string) {
    let tmp = orderFormCache[id];
    if (typeof tmp == "undefined") {
      tmp = ref<Order>(new OrderClass());
      orderFormCache[id] = tmp;
    }
    return tmp.value;
  }

  function updateForm(form: any) {
    Object.assign(getForm(form.instrumentId.toString()), form);
  }

  async function getOrders(
    payload: OrderSearchModel
  ): Promise<PaginatedResult<Order> | undefined> {
    if (userState.state.userName) {
      const orders = (
        await orderManager.getOrders(
          userState.state.userName,
          payload,
          axios.createInstance()
        )
      ).data as PaginatedResult<Order>;

      const pi = instrumentManager.getInstrumentsDetail(
        new InstrumentSearchModel(orders.data.map((ord) => ord.instrumentId))
      );
      const pw = wealthManager.getWealth({ offset: 0, length: 1, echo: null });

      const instruments = (await pi) as Array<InstrumentCache>;
      const wealth = (await pw) as Array<Wealth>;
      orders.data = orders.data.map((ord) => {
        return Object.assign(
          {},
          instruments.find((i) => i.id == ord.instrumentId),
          { wealth: wealth.find((w) => w.id == ord.instrumentId)?.amount ?? 0 },
          ord
        );
      });
      return orders;
    }
    return undefined;
  }

  async function placeOrder(order: Order) {
    const headers = {
      uuid: uuidv4(),
    };
    return await orderManager.setOrder(order, axios.createInstance(), headers);
  }

  async function editOrder(order: Order) {
    const headers = {
      uuid: uuidv4(),
    };
    const editOrderStatus = await orderManager.editOrder(
      order,
      axios.createInstance(),
      headers
    );
    if (editOrderStatus?.status) {
      router.push({
        path: `/watchlist/${route.params.name}/orders`,
        query: { offset: 0, length: 20 },
      });
      loading.showLoading(true);
    } else {
      loading.showLoading(false);
    }
  }

  function setSide(side: Side, id: string) {
    getForm(id);
    orderFormCache[id].value.side = side;
  }

  return {
    placeOrder,
    getOrders,
    getForm,
    updateForm,
    setSide,
    editOrder,
    last_update,
  };
});
