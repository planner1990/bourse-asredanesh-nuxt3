<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    modelValue: number | string;
    readonly?: boolean;
    tabIndex?: string;
    nameInput?: any;
  }>(),
  {
    label: "",
    readonly: false,
    tabIndex: "0",
    nameInput: "",
    height: "auto",
  }
);
const emit = defineEmits(["update:modelValue"]);
const active = ref<boolean>(false);
const join = (val: string): number => {
  if (val.includes(",")) {
    return Number(val.replace(/\,/gi, ""))
  }
  return Number(val)
}

const reg = /^[a-zA-Z ]$/;

const validateInput = (e: KeyboardEvent) => {
  if (reg.test(e.key)) {
    e.preventDefault()
    e.stopPropagation();
    return false
  }

}


const separate = (val: string): string => {
  val += "";
  val = val.replace(",", "");
  let x = val.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}

const separateValue = ref(separate(props.modelValue?.toString()));

watch(() => props.modelValue, (newVal) => {
  separateValue.value = separate(newVal.toString())
})

onMounted(() => {
  submitData();
});
watch(() => props.nameInput, () => {
  submitData();
})
const focus = ref<HTMLElement | null>(null);
function submitData() {
  if (props.nameInput === "focus") {
    focus.value?.focus();
  }
}
</script>

<style lang="postcss">
.ada-input {
  @apply tw-whitespace-nowrap tw-min-w-0 tw-w-full;

  &.has-label {
    .label {
      @apply tw-flex tw-items-center tw-text-black tw-overflow-clip tw-text-ellipsis tw-whitespace-nowrap;
      max-width: 65px;
    }
  }

  &.active {
    .scaffold {
      @apply tw-border-primary tw-bg-white;
    }
  }

  .scaffold {
    @apply tw-flex tw-justify-between tw-align-middle tw-cursor-text tw-bg-primary/10 tw-overflow-clip;
    @apply tw-border tw-border-black/50 tw-rounded;

    input {
      @apply tw-rounded tw-min-w-0 tw-inline tw-flex-grow tw-min-h-0 tw-px-2;
      background: none;
      outline-style: none;
      line-height: inherit;
      font-size: inherit;
      font-weight: inherit;
      height: inherit;
    }
  }
}
</style>

<template>
  <label :class="[
    'ada-input',
    active ? 'active' : '',
    label == '' ? '' : 'has-label',
  ]" tabindex="-1">
    <div class="label">
      {{ label }}
    </div>
    <div class="scaffold">
      <slot name="prepend" :active="active"></slot>
      <input type="text" :value="separateValue" class="ltr" v-bind="{ nameInput, ...$attrs }" :readonly="readonly"
        :tabindex="tabIndex" @focus="active = true" @blur="active = false" @keypress="validateInput"
        @input="(e) => emit('update:modelValue', join((e.target as HTMLInputElement).value))" ref="focus" />
      <slot name="append" :active="active"></slot>
    </div>
  </label>
</template>
