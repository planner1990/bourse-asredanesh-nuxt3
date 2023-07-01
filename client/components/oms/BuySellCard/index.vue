<script setup lang="ts">
import {useInstrument, useOrder, useAxios, useOrderQue} from "@/composables";
import {
  InstrumentCache,
  InstrumentSearchModel,
  Order,
  OrderClass,
  OrderFlags,
} from "@/types";
import {object, number, lazy, boolean, string} from "yup";
import {useI18n} from "vue-i18n";
import {getWage} from "@/repositories/wealth/wealth_manager";
import {useForm, useField} from 'vee-validate';


////////////////

const props = defineProps<{
  count: number;
  price: number;
  insId: number;
  insName: string;

}>();

//////////////

const i18n = useI18n();
const axios = useAxios();
const instrumentManager = useInstrument();
const orderManager = useOrder();
const active = ref<InstrumentCache>(new InstrumentCache());
const priceLock = ref(false);
const countLock = ref(false);
const wage = ref({buy: 0, sell: 0});

const activeCalculator = ref<boolean>(false);
const activeCalculatorSell = ref<boolean>(false);
const wholePrice = ref<number>(0);
const thresholdQuantityOfBuy = ref<number>(0);
const thresholdPriceOfBuy = ref<number>(0);
const order = computed(() => orderManager.getForm(props.insId.toString()));
const router = useRouter();
const route = useRoute();
const orderQueManager = useOrderQue();
getDetail()

const validateCountShape = () => number()
    .typeError(i18n.t("error.validation.number", {name: i18n.t("oms.count")}))
    .required(i18n.t("error.validation.required", {name: i18n.t("oms.count")}))
    .min(active.value.minQuantityPerOrder, i18n.t("error.validation.min", {
      name: i18n.t("oms.count"),
      value: active.value.minQuantityPerOrder
    }))


const validatePriceShape = () => number().typeError(i18n.t("error.validation.number", {name: i18n.t("oms.price")}))
    .required(i18n.t("error.validation.required", {name: i18n.t("oms.price")}))
    .min(active.value.minAllowedPrice, i18n.t("error.validation.min", {
      name: i18n.t("oms.price"),
      value: active.value.minAllowedPrice
    }))

const schemaBuySell = object({
  quantity: lazy(() => active.value.maxQuantityPerOrder > 0 ? validateCountShape()
          .max(active.value.maxQuantityPerOrder, i18n.t("error.validation.max", {
            name: i18n.t("oms.count"),
            value: active.value.maxQuantityPerOrder
          }))
      : validateCountShape()),
  enteredPrice: lazy(() => active.value.maxAllowedPrice > 0 ? validatePriceShape()
          .max(active.value.maxAllowedPrice, i18n.t("error.validation.max", {
            name: i18n.t("oms.price"),
            value: active.value.maxAllowedPrice
          }))
      : validatePriceShape()),
  accountType: number().required(),
  validatePercent: number().typeError(i18n.t("error.validation.number", {name: i18n.t("wealth.order.creditPercent")}))
      .min(0, i18n.t("error.validation.min", {name: i18n.t("wealth.order.creditPercent"), value: 0}))
      .max(100, i18n.t("error.validation.max", {name: i18n.t("wealth.order.creditPercent"), value: 100})),
  orderDivision: boolean().typeError(i18n.t("error.validation.boolean", {name: i18n.t("oms.splitOrders")}))
      .required(),
  validityDate: lazy(() => validityType.value === 2 ? string().required() : string()),
  validityType: number().required()

})

const {errors, validate, setFieldValue, handleSubmit} = useForm({
  validationSchema: schemaBuySell,
  initialValues: {
    quantity: order.value.quantity,
    enteredPrice: order.value.enteredPrice,
    accountType: 0,
    validatePercent: 0,
    orderDivision: false,
    validityDate: "",
    validityType: 1

  }
})

const {value: quantity, meta: quantityMeta, validate: quantityValidate} = useField<number>('quantity')
const {value: enteredPrice, meta: enteredPriceMeta, validate: enteredPriceValidate} = useField<number>('enteredPrice')
const {value: accountType, meta: accountTypeMeta} = useField<number>('accountType')
const {
  value: validatePercent,
  meta: validatePercentMeta,
  validate: validatePercentValidate
} = useField<number>('validatePercent')
const {
  value: orderDivision,
  meta: orderDivisionMeta,
  validate: orderDivisionValidate
} = useField<boolean>('orderDivision')
const {value: validityDate, meta: validityDateMeta, validate: validityDateValidate} = useField<string>('validityDate')
const {value: validityType, meta: validityTypeMeta, validate: validityTypeValidate} = useField<number>('validityType')

watch(order, () => {
  console.log(order.value)
  quantity.value = order.value.quantity;
})
//////////////// computed //////////

const baseTradeValue = computed(
    () => quantity.value * enteredPrice.value
);
const buyWage = computed(() => baseTradeValue.value * wage.value.buy);
const sellWage = computed(() => baseTradeValue.value * wage.value.sell);

const buyTradeValue = computed(() => baseTradeValue.value + buyWage.value);
const sellTradeValue = computed(() => baseTradeValue.value + sellWage.value);
const tab = computed({
  get() {
    return order.value.side.toString();
  },
  set(value: any) {
    if (active.value) {
      orderManager.setSide(value, active.value.id.toString());
      // updateData();
    }
  },
});
const countSell = computed(
    () => {
      const res = Math.floor(wholePrice.value / enteredPrice.value * (1 + wage.value.sell))
      if (isNaN(res) || res == Infinity) {
        quantity.value = 0
        return 0
      }
      quantity.value = res
      return res
    }
);
const countBuy = computed(
    () => {
      const res = Math.floor(wholePrice.value / (enteredPrice.value * (1 + wage.value.sell)))
      if (isNaN(res) || res == Infinity) {
        quantity.value = 0
        return 0
      }
      quantity.value = res
      return res
    }
);

const wageCalculateBuy = computed(
    () => {
      const res = enteredPrice.value * countBuy.value * wage.value.buy
      if (isNaN(res)) return 0
      return res
    }
);
const wageCalculateSell = computed(
    () => {
      const res = enteredPrice.value * countSell.value * wage.value.sell
      if (isNaN(res)) return 0
      return res
    }
);

const queue = computed(() => instrumentManager.getOrderQueue(active.value));
const firstRow = computed(() => queue.value[0]);

//////////methods//////////////

const check = (): boolean => {
  return !!(quantity.value && enteredPrice.value);
}

const placeOrder = ({draft}: { draft: boolean }) => handleSubmit(async (values, actions) => {
  const {valid} = await validate()
  if (valid) {
    const param: Order = {...order.value, ...values}
    param['termsAndConditions'] = true
    param['instrumentId'] = props.insId
    if (draft) param['flags'] = OrderFlags.Draft;
    try {
      orderManager
          .placeOrder(param)
          .then((res) => {
            if (res.status === 201) {
              orderManager.last_update = new Date().toISOString();
              actions.resetForm();
              orderManager.updateForm(new OrderClass());
              if (draft) {
                router.push(`/watchlist/${route.params.name}/orders?offset=0&length=20&flags=1`);
              } else {
                router.push(`/watchlist/${route.params.name}/orders?offset=0&length=20&flags=54`);
              }
            }
          })
    } catch (e) {
      orderManager.updateForm(values)
      console.log(e)
    }
  }
})()

function toggleCountLock() {
  countLock.value = !countLock.value;
  if (tab.value === "1") {
    quantity.value = firstRow.value.sell.count;
  } else {
    quantity.value = firstRow.value.buy.count;
  }
}

function togglePriceLock() {
  priceLock.value = !priceLock.value;
  if (tab.value === "1") {
    setFieldValue('enteredPrice', firstRow.value.sell.price)
  } else {
    setFieldValue('enteredPrice', firstRow.value.buy.price)
  }
}

async function getDetail() {
  await instrumentManager
      .getInstrumentsDetail(new InstrumentSearchModel([props.insId]))
      .then((data: Array<InstrumentCache>) => {
        active.value = data[0];
        thresholdQuantityOfBuy.value = data[0].minQuantityPerOrder;
        thresholdPriceOfBuy.value = data[0].minAllowedPrice;
        setFieldValue('quantity', order.value.quantity ? order.value.quantity : 0)
        setFieldValue('enteredPrice',order.value.enteredPrice ? order.value.enteredPrice : active.value.minAllowedPrice)

        getWage(
            props.insId.toString(),
            order.value.side,
            axios.createInstance()
        ).then((res) => {
          if (res.data)
            wage.value = {
              buy: res.data,
              sell: res.data,
            };
        })

      });
}

function changeTab() {
  countLock.value = false;
  priceLock.value = false;
  quantity.value = 0;
  enteredPrice.value = 0;
}

watch(orderQueManager, () => {
  quantity.value = orderQueManager.orderQueAmount;
})

const separate = (val: string): string => {
  val += "";
  val = val.replace(",", "");
  let x = val.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}
const withdrawalBalance = ref(separate((1000000).toString()))

watch(() => withdrawalBalance, (newVal) => {
  withdrawalBalance.value = separate(newVal.toString())
})
</script>

<style lang="postcss" scoped>
.buy-sell {
  @apply tw-h-full;

  .tabs {
    height: calc(100% - 32px);

    .frm {
      @apply tw-w-full tw-m-0 tw-p-0 tw-grid tw-grid-cols-2;

      .ada-input {
        @apply tw-flex tw-justify-between;

        & :deep(.scaffold) {
          @apply tw-border-none tw-bg-transparent;

          input {
            @apply tw-bg-primary tw-bg-opacity-10;
          }

          button {
            @apply tw-bg-primary tw-bg-opacity-10 tw-py-1 tw-px-[6px] tw-rounded-sm;

            .icon {
              @apply tw-text-primary;
            }

            &.active {
              @apply tw-bg-opacity-100;

              .icon {
                @apply tw-text-white;
              }
            }
          }
        }
      }

      > div {
        @apply tw-flex tw-flex-grow tw-items-center;

        height: var(--row-height);
        min-width: 50%;
        padding: 0 12px !important;
        position: relative;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        line-height: 0.83334rem !important;
        font-size: 0.83334rem;

        > label {
          /* @apply tw-h-8; */
        }
      }

      .input-checkbox {
        @apply tw-relative tw-w-5 tw-h-5 tw-border tw-border-solid tw-rounded-sm tw-cursor-pointer tw-transition-all tw-duration-150 tw-ml-1 tw-border-primary;
        appearance: none;
        outline: 0;

        &:checked {
          @apply tw-bg-primary;
        }
      }

      .windows.valid {
        & :deep(.active .input-container) {
          @apply tw-border tw-border-success;
        }
      }

      .windows.inValid {
        & :deep(.active .input-container) {
          @apply tw-border tw-border-error;
        }
      }
    }
  }

  .draft,
  .sell,
  .buy {
    @apply tw-h-[24px] tw-w-full tw-bg-primary tw-bg-opacity-10;
  }

  .draft:hover {
    @apply tw-bg-info tw-text-white;
  }

  .sell:hover {
    @apply tw-bg-error tw-text-white;
  }

  .buy:hover {
    @apply tw-bg-success tw-text-white;
  }

  button.active {
    background-color: var(--c-primary-rgb);
    color: white !important;

    i {
      color: white !important;
    }
  }

  * {
    @apply tw-text-base;
  }
}
</style>

<style lang="postcss">
.buy-sell {
  @apply tw-m-0 tw-p-0;

  .toggle {
    .ada-button {
      @apply tw-transition-all;
      @apply tw-h-11;

      &.buy {
        @apply tw-w-1/2;

        &:hover {
          @apply tw-bg-success;
        }

        &.active {
          @apply tw-bg-success tw-bg-opacity-80;

          &:hover {
            @apply tw-bg-success;
          }
        }
      }

      &.sell {
        @apply tw-w-1/2;

        &:hover {
          @apply tw-bg-error;
        }

        &.active {
          @apply tw-bg-error tw-bg-opacity-80;

          &:hover {
            @apply tw-bg-error;
          }
        }
      }
    }
  }

  .tabs {
    .frm {
      .inputColor {
        @apply tw-text-primary;

        .label {
          @apply tw-text-primary;
        }

        .scaffold {
          width: calc(100% - 65px);
          max-width: calc(100% - 65px);
          /* @apply tw-bg-red-400; */

          input {
            @apply tw-font-bold tw-py-1;
          }
        }

        &.valid .scaffold input {
          @apply tw-border tw-border-success;
        }

        &.inValid .scaffold input {
          @apply tw-border tw-border-error;
        }
      }

      .ada-select {
        @apply tw-justify-between;

        .input {
          width: calc(100% - 65px);
          max-width: calc(100% - 65px);
          @apply tw-bg-primary tw-bg-opacity-10 tw-rounded tw-items-center;
        }
      }
    }
  }
}

.menu {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25) !important;
  border-radius: 8px;
}

.calculator-container {
  background-color: #fff;
  color: #000000;
  position: absolute;
  z-index: 9999999999;
  top: 32px;
  left: 10px;
  width: 88%;
  height: 158px;
  border-radius: 8px;
  padding: 12px 8px;
  overflow-y: auto;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);

  .label {
    color: rgb(130, 130, 130) !important;
    font-weight: 500 !important;
  }

  .ada-input {
    @apply tw-flex tw-items-center tw-text-gray3;

    .label {
      @apply tw-w-[85px] tw-text-gray3;
    }

    .scaffold {
      @apply tw-w-full tw-text-gray3;
      border-color: transparent;
    }

    &.active {
      .scaffold {
        @apply tw-border-primary tw-text-gray3;
      }
    }
  }

  & > div {

    > span:last-child {
      @apply tw-mr-10 tw-text-gray3;
    }
  }

  .ada-button {
    @apply tw-bg-primary tw-w-fit tw-px-2 tw-py-0 tw-float-left tw-text-white tw-font-normal tw-h-9 tw-ml-1;
    line-height: 1rem;
  }

  .ada-input.has-label .label {
    @apply tw-text-gray3;
    font-size: 10px;
    font-weight: 400;
  }

  .calculate-remain {
    font-weight: 500;
    font-size: 9px;

    span {
      @apply tw-text-success;
      font-weight: 700;
    }
  }
}
</style>

<template>
  <div class="buy-sell">
    <ada-toggle v-model="tab" class="header-tabs">
      <ada-btn class="buy tw-rounded-none" :height="32" :model="1" @click="changeTab">
        {{ $t("oms.buy") }}
      </ada-btn>
      <ada-btn class="sell tw-rounded-none" :height="32" :model="2" @click="changeTab">
        {{ $t("oms.sell") }}
      </ada-btn>
    </ada-toggle>
    <ada-tabs v-model="tab" class="tabs">
      <ada-tab :model="1">
        <form class="frm" disabled="true">
          <div class="tw-col-span-2 tw-justify-center">
            <span class="tw-mx-3">{{ $t("wealth.sharesCount") }} ({{ insName }}):
            </span>
            <numeric-field :value="active.amount" class="tw-pl-2"/>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.countThreshold") }}: </span>
            <numeric-field :value="thresholdQuantityOfBuy"/>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.priceThreshold") }}: </span>
            <numeric-field :value="thresholdPriceOfBuy"/>
          </div>
          <div class="tw-justify-between">
            <ada-currency-input :label="$t('oms.count')" v-model="quantity"
                                :id="`buyCountInputText-${insId}`"
                                :readonly="countLock" class="inputColor" :class="{
                inValid: errors?.quantity,
                valid: quantityMeta?.valid && quantityMeta?.validated,
              }" :min="!!active ? active.minQuantityPerOrder : 1"
                                :max="!!active ? active.maxQuantityPerOrder || null : null"
                                :nameInput="tab === '1' ? 'focus' : ''">
              <template #append>
                <ada-btn :class="['tw-mx-1', countLock ? 'active' : '']" :width="24" :height="24"
                         @click="toggleCountLock" icon tabindex="-1">
                  <ada-icon>isax-lock-1</ada-icon>
                </ada-btn>

                <div>
                  <ada-btn @click.stop="activeCalculator = !activeCalculator" :width="24" :height="24"
                           tabindex="-1"
                           :class="[activeCalculator ? 'tw-bg-primary' : null]">
                    <ada-icon :class="[activeCalculator ? 'tw-text-white' : null]">isax-calculator
                    </ada-icon>
                  </ada-btn>

                  <div class="calculator-container" v-if="activeCalculator"
                       v-ada-click-outside="() => (activeCalculator = false)">
                    <div class="tw-w-full tw-flex tw-flex-wrap tw-mb-4">
                      <div class="tw-text-[10px] tw-font-medium tw-ml-1">مانده قابل برداشت:</div>
                      <div class="tw-text-[13px] tw-font-bold tw-text-success">
                        {{ withdrawalBalance }}
                        <span class="tw-text-[10px] tw-font-extralight tw-text-success">ریال</span>
                      </div>
                    </div>
                    <ada-currency-input :label="$t('instrument.wholePrice')"
                                        class="tw-mb-2 tw-text-gray3"
                                        placeholder="0" v-model="wholePrice">
                    </ada-currency-input>
                    <ada-currency-input class="tw-mb-2 tw-text-gray3"
                                        :label="$t('instrument.price')"
                                        v-model="enteredPrice">
                    </ada-currency-input>

                    <div class="tw-mt-4 mb-3">
                                            <span class="tw-text-[10px] tw-font-medium tw-ml-1">{{
                                                $t("oms.wage")
                                              }}:</span>
                      <span class="tw-text-[12px] tw-font-bold tw-text-info tw-mr-0">
                        <numeric-field :value="wageCalculateBuy" class="tw-ml-1"/>
                        ریال
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </ada-currency-input>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <ada-currency-input :label="$t('oms.price')" v-model="enteredPrice" activeBorder
                                :readonly="priceLock"
                                class="inputColor" :class="{
                inValid: errors?.enteredPrice,
                valid: enteredPriceMeta?.valid && enteredPriceMeta?.validated,
              }" :min="!!active ? active.minAllowedPrice : 1" :max="!!active ? active.maxAllowedPrice || null : null">
              <template #append>
                <ada-btn :class="['tw-mr-1', priceLock ? 'active' : '']" :width="24" :height="24"
                         @click="togglePriceLock" icon tabindex="-1">
                  <ada-icon color="primary">isax-lock-1</ada-icon>
                </ada-btn>
              </template>
            </ada-currency-input>
          </div>
          <div class="tw-justify-between">
            <wealth-account-type :label="$t('accounting.account.type')" class="tw-my-1 inputColor" :class="{
              inValid: errors?.accountType,
              valid: accountTypeMeta?.valid && accountTypeMeta?.validated,
            }" height="24px" tabindex="-1">
            </wealth-account-type>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <wealth-validity v-model:validityDate="validityDate" v-model:validityType="validityType"
                             height="24px"
                             class="tw-my-1 inputColor" :label="$t('accounting.account.credit')"
                             tabindex="-1" :class="{
                inValid: errors?.validityDate,
                valid: validityDateMeta?.valid && validityDateMeta?.validated,
              }">
            </wealth-validity>
          </div>
          <div class="tw-justify-between tw-col-span-2">
            <oms-buy-sell-card-percent v-model="order.discloseQuantity" :label="$t('oms.view-count')"
                                       height="31px"
                                       class="tw-flex tw-flex-grow inputColor" :min="30" :max="100"
                                       :total="quantity" :amount="100"
                                       tabindex="-1">
            </oms-buy-sell-card-percent>
          </div>
          <div class="tw-justify-between">
            <ada-input :label="$t('wealth.order.creditPercent')" class="tw-h-[24px] inputColor"
                       type="number" :min="0"
                       :max="100" v-model="validatePercent" tabindex="-1" :class="{
                inValid: errors?.validatePercent,
                valid: validatePercentMeta?.valid && validatePercentMeta?.validated,
              }">
            </ada-input>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <div class="tw-w-max tw-flex tw-items-center">
              <input type="checkbox" v-model="orderDivision" class="input-checkbox" tabindex="-1"/>
              <label for="input-checkbox" class="inputColor" v-text="$t('oms.splitOrders')"></label>
            </div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.tradeWage") }}: </span>
            <numeric-field :value="buyWage"/>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.tradeValue") }}:</span>
            <numeric-field :value="buyTradeValue"/>
          </div>
          <div class="tw-justify-center">
            <ada-btn class="draft" @click.stop="placeOrder({ draft: true })" depressed
                     :tabindex="tab === 1 ? '-1' : null">
              {{ $t("general.draft") }}
            </ada-btn>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-center" tabindex="2">
            <ada-btn class="buy" height="24px" :disabled="!active || (active.status & 3) != 3"
                     @click.stop="placeOrder({ draft: false })" depressed
                     :class="[quantity > 1 && enteredPrice ? 'tw-bg-success tw-text-white' : null]">
              {{ $t("oms.buy-btn") }}
            </ada-btn>
          </div>
        </form>
      </ada-tab>
      <ada-tab :model="2">
        <form class="frm">
          <div class="tw-col-span-2 tw-justify-center">
            <span class="tw-mx-3">{{ $t("wealth.sharesCount") }} ({{ insName }}):
            </span>
            <numeric-field :value="active.amount" class="tw-pl-2"/>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.countThreshold") }}: </span>
            <numeric-field :value="thresholdQuantityOfBuy"/>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.priceThreshold") }}: </span>
            <numeric-field :value="thresholdPriceOfBuy"/>
          </div>
          <div class="tw-justify-between">
            <ada-currency-input :label="$t('oms.count')" v-model="quantity"
                                :id="`sellCountInputText-${insId}`"
                                :readonly="countLock" class="inputColor" :class="{
                inValid: errors?.quantity,
                valid: quantityMeta?.valid && quantityMeta?.validated,
              }" activeBorder :min="!!active ? active.minQuantityPerOrder : 1"
                                :max="!!active ? active.maxQuantityPerOrder || null : null"
                                :nameInput="tab === '2' ? 'focus' : ''">
              <template #append>
                <ada-btn :class="[countLock ? 'active' : '']" :width="24" :height="24"
                         @click="toggleCountLock" icon
                         tabindex="-1">
                  <ada-icon color="primary">isax-lock-1</ada-icon>
                </ada-btn>
                <ada-menu :active="activeCalculatorSell" :mWidth="180" :mLeft="-11.5" :mTop="30">
                  <template #activator>
                    <ada-btn @click.stop="activeCalculatorSell = !activeCalculatorSell" :width="24"
                             :height="24"
                             tabindex="-1" :class="[activeCalculatorSell ? 'tw-bg-primary' : null]">
                      <ada-icon :class="[activeCalculatorSell ? 'tw-text-white' : null]">
                        isax-calculator
                      </ada-icon>
                    </ada-btn>
                  </template>
                  <template #items>
                    <div class="calculate"
                         v-ada-click-outside="() => (activeCalculatorSell = false)">
                      <ada-currency-input :label="$t('instrument.wholePrice')" placeholder="0"
                                          v-model="wholePrice">
                      </ada-currency-input>
                      <ada-currency-input :label="$t('instrument.price')" v-model="enteredPrice">
                      </ada-currency-input>

                      <div>
                        <span>{{ $t("oms.wage") }}:</span>
                        <span>
                          <numeric-field :value="wageCalculateSell"/>
                        </span>
                      </div>
                      <div>
                        <ada-btn @click.stop="activeCalculatorSell = false"><span
                            v-text="$t('general.verify')"></span>
                        </ada-btn>
                      </div>
                    </div>
                  </template>
                </ada-menu>
              </template>
            </ada-currency-input>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <ada-currency-input :label="$t('oms.price')" v-model="enteredPrice" :readonly="priceLock"
                                class="inputColor"
                                :class="{
                inValid: errors?.enteredPrice,
                valid: enteredPriceMeta?.valid && enteredPriceMeta?.validated,
              }" activeBorder :min="!!active ? active.minAllowedPrice : 1"
                                :max="!!active ? active.maxAllowedPrice || null : null">
              <template #append>
                <ada-btn @click="togglePriceLock" :class="['tw-mx-1', priceLock ? 'active' : '']"
                         :width="24"
                         :height="24" icon tabindex="-1">
                  <ada-icon color="primary">isax-lock-1</ada-icon>
                </ada-btn>
              </template>
            </ada-currency-input>
          </div>
          <div class="tw-justify-between">
            <wealth-account-type :label="$t('accounting.account.type')" class="tw-my-1 inputColor" :class="{
              inValid: errors?.accountType,
              valid: accountTypeMeta?.valid && accountTypeMeta?.validated,
            }" height="24px" tabindex="-1">
            </wealth-account-type>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <wealth-validity v-model:validityDate="validityDate" v-model:validityType="validityType"
                             height="24px"
                             class="tw-my-1 inputColor" :label="$t('accounting.account.credit')"
                             tabindex="-1" :class="{
                inValid: errors?.validityDate,
                valid: validityDateMeta?.valid && validityDateMeta?.validated,
              }">
            </wealth-validity>
          </div>
          <div class="tw-justify-between tw-col-span-2">
            <oms-buy-sell-card-percent v-model="order.discloseQuantity" :label="$t('oms.view-count')"
                                       height="31px"
                                       class="tw-flex tw-flex-grow inputColor" :min="30" :total="quantity"
                                       :amount="100" tabindex="-1">
            </oms-buy-sell-card-percent>
          </div>
          <div class="tw-justify-between">
            <ada-input :label="$t('oms.stockPercent')" type="number" class="tw-h-[24px] inputColor" :min="0"
                       :max="100"
                       v-model="validatePercent" tabindex="-1" activeBorder :class="{
                inValid: errors?.validatePercent,
                valid: validatePercentMeta?.valid && validatePercentMeta?.validated,
              }">
            </ada-input>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <div class="tw-w-max tw-flex tw-items-center">
              <input type="checkbox" v-model="orderDivision" class="input-checkbox" tabindex="-1"/>
              <label for="input-checkbox" class="inputColor" v-text="$t('oms.splitOrders')">
              </label>
            </div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.tradeWage") }}: </span>
            <numeric-field :value="sellWage"/>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-between">
            <span>{{ $t("oms.tradeValue") }}: </span>
            <numeric-field :value="sellTradeValue"/>
          </div>
          <div class="tw-justify-center">
            <ada-btn class="draft" height="24px" @click="
              () => {
                placeOrder({ draft: true });
              }
            " depressed>
              {{ $t("general.draft") }}
            </ada-btn>
            <div class="bar"></div>
          </div>
          <div class="tw-justify-center">
            <ada-btn class="sell" :disabled="!active || (active.status & 3) != 3"
                     @click.stop="placeOrder({ draft: false })" depressed :tabindex="tab == 2 ? '1' : null"
                     :class="[quantity > 1 && enteredPrice ? 'tw-bg-error tw-text-white' : null]">
              {{ $t("oms.sell-btn") }}
            </ada-btn>
          </div>
        </form>
      </ada-tab>
    </ada-tabs>
  </div>
</template>
