<template>
  <v-row class="justify-center ma-0 mt-12">
    <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '4'" class="pa-0">
      <v-card
        class="primary-card pa-8 v-card v-sheet theme--light pa-10"
        style="border-radius: 20px; margin-top: 5px"
      >
        <h3>Insira o e-mail para enviarmos um código para recuperar a senha</h3>
        <v-form ref="form" class="pt-4" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            @keyup.enter="forgotPassword"
            required
            outlined
          ></v-text-field>

          <v-btn color="success" @click="forgotPassword"> Enviar </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'login',

  data: () => ({
    loading: false,
    valid: true,
    emailRules: [
      (v) => !!v || 'Um E-mail é necessario',
      (v) => /.+@.+\..+/.test(v) || 'O E-mail não é valido',
    ],
    email: '',
  }),
  methods: {
    async forgotPassword() {
      if (this.email.trim() !== '') {
        await this.$axios
          .$get(`user/forgot-password?email=${this.email}`)
          .then((response) => {
            this.$toast.success(response)
          })
          .catch((error) => {
            this.$toast.error(error.response.data)
          })
      }
    },
  },
}
</script>
