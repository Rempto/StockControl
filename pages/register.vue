<template>
  <v-row class="justify-center ma-0 mt-12">
    <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '4'" class="pa-0">
      <card-login title="Registro" @register="CreateUser"></card-login>
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
        .$post(`user/post`, obj)
        .then((response) => {
          this.$toast.success(response)
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
  },
}
</script>
