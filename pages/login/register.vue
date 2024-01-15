<template>
  <v-row class="justify-center ma-0 mt-12">
    <v-col
      :cols="$vuetify.breakpoint.xs ? '12' : '5'"
      class="pa-0"
      style="display: flex; justify-content: center"
    >
      <cardRegister title="Cadastrar" @register="CreateUser"></cardRegister>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {}
  },
  methods: {
    async CreateUser(obj) {
      await this.$axios
        .$post(`user/add`, obj)
        .then((response) => {
          this.$toast.success(response)
          this.$router.push('/')
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
  },
}
</script>
