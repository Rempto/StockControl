<template>
  <v-row class="justify-center ma-0 mt-12">
    <v-col
      :cols="$vuetify.breakpoint.xs ? '12' : '5'"
      class="pa-0"
      style="display: flex; justify-content: center"
    >
      <CardRegister
        title="Login"
        :is-login="true"
        @login="LoginUser"
      ></CardRegister>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'login',
  methods: {
    async LoginUser(obj) {
      await this.$store.dispatch('user/login', obj)
    },
    data() {
      return {}
    },
  },
}
</script>
