<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-card>
          <img alt="logo" />
        </v-card>
      </div>
      <div class="text-center">
        <login />
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import login from "~/components/login.vue";

export default defineComponent({
  components: {
    login,
  },
  setup() {},
});
</script>
