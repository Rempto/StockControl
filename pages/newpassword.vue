<template>
    <div>
        <div class="d-flex justify-center">
            <v-card class="  pa-4 my-card" style="border-radius: 20px; margin-top: 5px; ">
                <h2 id="title" class=" mb-3 ml-1">Renovação de senha</h2>
                <p class="paragraph-2">insira sua nova senha</p>
                <div class="ma-0">
                    <v-row class="justify-center ma-2" style="align-items: center;">
                        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'" class="pa-0">
                            <v-text-field v-model="newPassword" type="password" label="Nova senha" required
                                outlined></v-text-field>
                        </v-col>
                        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'" class="pa-0">
                            <v-text-field v-model="checkPassword" type="password" label="Confirmar nova senha" required
                                outlined></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <div class="d-flex justify-end ma-3">
                    <v-btn @click="change">Alterar senha</v-btn>

                </div>

            </v-card>

        </div>
    </div>
</template>  

<script>
export default {
    layout: "login",
    data: () => ({
        newPassword: null,
        checkPassword: null,
        userId: null

    }),
    created() {
        this.userId = this.$route.query.key
    },
    methods: {

        async change() {
            if (this.newPassword === this.checkPassword) {
                await this.$axios.$put(`user/edit-email-password?id=${this.userId}&newPassword=${this.newPassword}`).then((response) => {
                    this.$toast.success(response)
                    this.$router.push('/')
                }).catch((error) => {
                    this.$toast.error(error.response.data)
                    this.clearFields()

                })
            } else {
                this.checkPassword = null
                this.$toast.error("confirmação de senha incorreta")
            }

        },
        clearFields() {
            this.checkPassword = null
            this.newPassword = null
            this.oldpassword = null
        }
    }
}
</script>