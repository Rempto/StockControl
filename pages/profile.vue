<template>
  <div>
    <header>
      <v-card
        class="pa-8 theme--light"
        style="border-radius: 20px; margin-top: 5px"
      >
        <v-row>
          <v-col>
            <v-flex>
              <!---->
              <h2 id="title" class="mb-3 ml-1">Perfil</h2>
            </v-flex>
            <p class="paragraph-2">
              Atualize as informações do seu perfil e altere sua foto
            </p>
          </v-col>
        </v-row>
      </v-card>
    </header>

    <div>
      <v-card class="pa-4 my-card" style="border-radius: 20px; margin-top: 5px">
        <div class="d-flex justify-center">
          <v-img
            v-if="avatar"
            :src="avatar"
            style="
              border-radius: 80px;
              height: 120px;
              max-width: 120px;
              background-position: center center;
              background-image: url('https://portal.keener.io/_nuxt/img/default-account.d1c835b.svg');
            "
          >
          </v-img>
          <v-avatar
            v-if="!avatar"
            style="
              border-radius: 80px;
              height: 120px;
              width: 120px;
              background-position: center center;
              background-color: #f5f5f5;
            "
          >
            <span class="black--text text-h3">{{
              user.initials.toUpperCase()
            }}</span>
          </v-avatar>
          <v-file-input
            id="input"
            style="
              position: relative;
              top: 70px;
              right: 50px;
              max-width: 0px !important;
              height: 50px;
            "
            v-model="selectedFile"
            @change="uploadAvatar"
            prepend-icon=""
            hide-input
          >
            <template #append-outer
              ><v-btn
                @click="inputfile"
                x-small
                style="height: 40px; width: 40px; border-radius: 20px"
                color="#eeeeee"
              >
                <v-icon size="30">mdi-camera</v-icon>
              </v-btn>
            </template>
          </v-file-input>
        </div>

        <div class="text-center" style="margin-top: 10px">
          <span style="padding: 5px">
            {{ user.name }}
          </span>
          <br />
          <strong>{{ user.email }}</strong>
        </div>
        <div class="d-flex justify-end ma-3">
          <v-btn v-if="changePassword == false" @click="changePassword = true"
            >Alterar senha</v-btn
          >
        </div>
        <div v-if="changePassword" class="ma-0">
          <v-row class="justify-center ma-2" style="align-items: center">
            <v-col
              :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'"
              class="pa-0"
            >
              <v-text-field
                v-model="oldpassword"
                type="password"
                label="Senha atual"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'"
              class="pa-0"
            >
              <v-text-field
                v-model="newPassword"
                type="password"
                label="Nova senha"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              :cols="$vuetify.breakpoint.smAndDown ? '12' : '8'"
              class="pa-0"
            >
              <v-text-field
                v-model="checkPassword"
                type="password"
                label="Confirmar nova senha"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex justify-end ma-3" v-if="changePassword">
          <v-btn @click="change()">Alterar senha</v-btn>
          <v-btn @click="changePassword = false">cancelar</v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.user.name = this.$store.state.user.user.name
    this.user.email = this.$store.state.user.user.email
    this.user.id = this.$store.state.user.user.id
    this.user.initials = this.user.email[0]
    this.getuserAvatar()
  },

  data: () => ({
    avatar: null,
    selectedFile: null,
    oldpassword: null,
    newPassword: null,
    checkPassword: null,
    changePassword: false,
    user: {
      initials: '',
      id: '',
      name: '',
      email: '',
    },
  }),
  methods: {
    async change() {
      if (this.newPassword === this.checkPassword) {
        await this.$axios
          .$put(
            `user/edit-password?email=${this.user.email}&oldPassword=${this.oldpassword}&newPassword=${this.newPassword}`
          )
          .then((response) => {
            this.$toast.success(response)
            this.clearFields()
          })
          .catch((error) => {
            this.$toast.error(error.response.data)
            this.clearFields()
          })
      } else {
        this.checkPassword = null
        this.$toast.error('confirmação de senha incorreta')
      }
    },
    clearFields() {
      this.checkPassword = null
      this.newPassword = null
      this.oldpassword = null
    },
    async uploadAvatar() {
      const formData = new FormData()
      formData.append('Avatar', this.selectedFile)
      formData.append('UserId', this.user.id)
      console.log(formData)

      await this.$axios
        .$post(`user/update-avatar`, formData)
        .then((response) => {
          this.$toast.success(response)
          this.getuserAvatar()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error.response.data)
        })
    },
    async getuserAvatar() {
      await this.$axios
        .$get(`user/getbyid?id=${this.user.id}`)
        .then((response) => {
          this.avatar = response.avatar
        })
        .catch(() => {})
    },
    inputfile() {
      const file = document.getElementById('input')
      file.click()
    },
  },
}
</script>
