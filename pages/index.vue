<template>
  <v-row class="justify-center ma-0 mt-12">
    <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '4'" class="pa-0">
      <card-login title="Login" :is-login="true" @login="LoginUser"></card-login>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "login",
  methods: {
    async LoginUser(obj) {
      await this.$store.dispatch("user/login", obj);
    },
    data() {
      return {};
    },
  },
}
</script>
