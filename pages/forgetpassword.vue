<template>
    <v-row class="justify-center ma-0 mt-12">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '4'" class="pa-0">
            <v-card class="primary-card pa-8 v-card v-sheet theme--light pa-10"
                style="border-radius: 20px; margin-top: 5px;">
                <h2>esqueci minha senha</h2>
                <v-form ref="form" lazy-validation>

                    <v-text-field v-model="email" :rules="emailRules" label="Email" required outlined></v-text-field>




                    <v-btn color="success" @click="sendEmail">
                        Enviar
                    </v-btn>

                </v-form>


            </v-card>
        </v-col>
    </v-row>
</template>
  
<script>
export default {
    layout: "login",


    data: () => ({
        loading: false,
        valid: true,
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        email: null
    }),
    methods: {
        async sendEmail() {
            await this.$axios
                .$get(`user/send-email?email=${this.email}`)
                .then((response) => {
                    //  this.$toast.success(response)
                })
                .catch((error) => {
                    this.$toast.error(error.response.data)
                })
        }
    },
}
</script>
  