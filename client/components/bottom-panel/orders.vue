<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {InstrumentCache, Order, OrderFlags, PasswordType, Side, ValidationType, WatchListColumns,} from "@/types";
import {useAxios, useInstrument, useOrder} from "~~/composables";
import DateTime from "@/components/date/time.vue";
import NumericField from "@/components/numericField.vue";
import {deleteOrdersByIds} from "~/repositories/wealth/wealth_manager";

const statusFlag = ref<any>(null);
const draftFlag = ref<boolean>();
const draftCheckedNames = ref([]);

const props = defineProps<{
  orders: Order[]
}>()

// added use instrument for read selected index
const orderManager = useOrder();
const i18n = useI18n();
const route = useRoute();
const instrumentManager = useInstrument();
const axios = useAxios();
const snack = useSnacks();
const cols = [
  new WatchListColumns(i18n.t("instrument.row").toString(), "groupSend", "center", "50px"),
  new WatchListColumns(i18n.t("general.status").toString(), "flags"),
  new WatchListColumns(i18n.t("instrument.name").toString(), "name"),
  new WatchListColumns(i18n.t("wealth.order.vol").toString(), "quantity"),
  new WatchListColumns(i18n.t("wealth.order.vol-done").toString(), "doneQuantity"),
  new WatchListColumns(i18n.t("wealth.order.vol-rem").toString(), "remainQuantity"),
  new WatchListColumns(i18n.t("wealth.order.enteredPrice").toString(), "enteredPrice"),
  new WatchListColumns(i18n.t("wealth.order.creationDate").toString(), "creationDate"),
  new WatchListColumns(i18n.t("wealth.order.lastTransaction").toString(), "last"),
  new WatchListColumns(i18n.t("wealth.order.side.title").toString(), "side"),
  new WatchListColumns(i18n.t("wealth.order.validity").toString(), "validity", "center", "90px"),
  new WatchListColumns("", "more"),
];
const agreement = ref(true);


function parseOrderFlags(status: number) {
  if (status == OrderFlags.Draft) {
    return "wealth.order.flags.Draft";
  } else if (status == OrderFlags.ClientRequest) {
    return "wealth.order.flags.ClientRequest";
  } else if (status == OrderFlags.Cancelled) {
    return "wealth.order.flags.Cancelled";
  } else if (status == OrderFlags.Created) {
    return "wealth.order.flags.Created";
  } else if (status == (OrderFlags.Created | OrderFlags.Sent)) {
    return "wealth.order.flags.Sent";
  } else if (status == (OrderFlags.Created | OrderFlags.Sent | OrderFlags.Confirmed)) {
    return "wealth.order.flags.Confirmed";
  } else if (
      status ==
      (OrderFlags.Created | OrderFlags.Sent | OrderFlags.Confirmed | OrderFlags.PreOpening)
  ) {
    return "wealth.order.flags.PreOpening";
  }
  return status.toString()
}

function parseValidityType(status: number) {
  if (status == ValidationType.Day) {
    return i18n.t("wealth.order.validationType.Day").toString();
  } else if (status == ValidationType.FillAndKill) {
    return i18n.t("wealth.order.validationType.FillAndKill").toString();
  } else if (status == ValidationType.GoodTillCancel) {
    return i18n.t("wealth.order.validationType.GoodTillCancel").toString();
  } else if (status == ValidationType.GoodTillDate) {
    return i18n.t("wealth.order.validationType.GoodTillDate").toString();
  } else if (status == ValidationType.Session) {
    return i18n.t("wealth.order.validationType.Session").toString();
  } else if (status == ValidationType.SlidingValidity) {
    return i18n.t("wealth.order.validationType.SlidingValidity").toString();
  }
}

function isRunabled(status: number) {
  statusFlag.value = status;
  return (status & OrderFlags.Draft) == OrderFlags.Draft;
}

function isEditDisabled(status: number) {
  return (status & OrderFlags.Editable) != 0;
}

function isDeleteDisabled(status: number) {
  return (status & OrderFlags.Deleteable) != 0;
}

function executeDraftOrder(draftOrder: Order) {
  const param: any = {...draftOrder};
  param.flags = OrderFlags.Created;
  param.termsAndConditions = agreement.value;
  orderManager.editOrder(param);
}

function hasValidityDate(order: Order) {
  return (order.validityType == ValidationType.GoodTillDate)
      && (order.validityDate != null)
}

watch(
    () => route.query,
    () => {
      if (route.query.flags == "1") {
        draftFlag.value = true;
      } else {
        draftFlag.value = false;
        cols.shift();
      }
    },
    {immediate: true}
)

// watch(checkedNames, () => {
//   console.log(checkedNames.value);
// })

function handleEditOrder(item: InstrumentCache, side: Side) {
  orderManager.updateForm(item);
  instrumentManager.addFocus(item);
  instrumentManager.activateTab(item);
  instrumentManager.setFocusMode(0);
  orderManager.setSide(side, item.id.toString());
  // instrumentManager.select(item)
}

async function removeOrdersByIds() {
  await deleteOrdersByIds(draftCheckedNames.value, axios.createInstance()).then(() => {
    draftCheckedNames.value = [];
    snack.showMessage({
      content: "general.successful",
      color: "white",
      timeout: 3000,
      bg: "success",
    });
  }).catch(() => {
    snack.showMessage({
      content: "general.failed",
      color: "white",
      timeout: 3000,
      bg: "error",
    });
  });
}
</script>
<style scoped>
.checkbox-ADA-custom input[type="checkbox"] {
  margin-left: 0;
}

.checkbox-ADA-custom label:before {
  @apply tw-border-success
}

.checkbox-ADA-custom label:after {
  @apply tw-border-success
}
</style>
<template>
  <ada-data-table :items="orders" :headers="cols" item-key="id" class="tw-w-full tw-relative">
    <template #item.groupSend="{ item }" v-if="draftFlag">
      <div class="checkbox-ADA-custom">
        <input type="checkbox" :id="item.instrumentCode" :value="item.id" v-model="draftCheckedNames">
        <label :for="item.instrumentCode"><span></span></label>
      </div>
    </template>
    <template #button v-if="draftCheckedNames.length != 0">
      <ada-btn
          class="tw-bg-primary tw-text-white tw-min-h-[10px] tw-text-[10px] tw-px-5 tw-py-2
              tw-rounded-lg tw-m-0 tw-p-0 tw-fixed tw-left-[10rem] -tw-translate-y-[58.5rem] tw-z-10">
        {{ $t("instrument.sendGroup") }}
      </ada-btn>
      <ada-btn
          class="tw-bg-error tw-text-white tw-min-h-[10px] tw-text-[10px] tw-px-3 tw-py-2
              tw-rounded-lg tw-m-0 tw-p-0 tw-fixed tw-left-[17.5rem] -tw-translate-y-[58.5rem] tw-z-10"
          @click="removeOrdersByIds">
        {{ $t("instrument.deleteGroup") }}
      </ada-btn>
    </template>
    <template #item.creationDate="{ item }">
      <DateTime :value="item.creationDate" :format="$t('general.date.dt')" class="ltr"/>
    </template>
    <template #item.last="{ item }">
      <DateTime :value="item.creationDate" :format="$t('general.date.dt')" class="ltr"/>
    </template>
    <template #item.quantity="{ item }">
      <NumericField :value="item.quantity"/>
    </template>
    <template #item.remainQuantity="{ item }">
      <NumericField :value="item.remainQuantity"/>
    </template>
    <template #item.doneQuantity="{ item }">
      <NumericField :value="item.quantity - item.remainQuantity"/>
    </template>
    <template #item.side="{ item }">
      <span>{{ $t("wealth.order.side." + item.side) }}</span>
    </template>
    <template #item.flags="{ item }">
      {{ $t(parseOrderFlags(item.flags)) }}
    </template>
    <template #item.more="{ item }" v-if="draftCheckedNames.length == 0">
      <ada-btn color="transparent" class="tw-m-0 tw-p-0" :width="24" :height="24" depressed
               :disabled="!isRunabled(item.flags)" @click="executeDraftOrder(item)">
        <ada-icon class="tw-text-success" color="success" :disabled="!isRunabled(item.flags)" :size="16">
          isax-play
        </ada-icon>
      </ada-btn>
      <ada-btn color="transparent" class="tw-m-0 tw-p-0" :width="24" :height="24" depressed
               :disabled="isEditDisabled(item.flags)">
        <ada-icon class="tw-text-info" color="info" :disabled="isEditDisabled(item.flags)" :size="16"
                  @click="handleEditOrder(item, item.side)">
          isax-edit-2
        </ada-icon>
      </ada-btn>
      <ada-btn color="transparent" class="tw-m-0 tw-p-0" :width="24" :height="24" depressed
               :disabled="isDeleteDisabled(item.flags)">
        <ada-icon class="tw-text-error" color="error" :disabled="isDeleteDisabled(item.flags)" :size="16">
          isax-trash
        </ada-icon>
      </ada-btn>
    </template>
    <template #item.validity="{ item }">
      <span v-if="!hasValidityDate(item)">
        {{ parseValidityType(item.validity) }}
      </span>
      <DateTime v-else :value="item.validityDate" :format="$t('general.date.dt')" class="ltr"/>
    </template>
  </ada-data-table>
</template>
