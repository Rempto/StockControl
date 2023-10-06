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
              <h2 id="title" class="mb-3 ml-1">Registro de Usuario</h2>
            </v-flex>
            <p class="paragraph-2">area reservada para administradores</p>
          </v-col>
        </v-row>
      </v-card>
    </header>

    <div class="pa-3">
      <v-row>
        <v-flex xs12 lg6 sm4 md6>
          <v-card
            max-width="600"
            class="primary-card pa-8 theme--light"
            style="border-radius: 20px; margin-top: 5px"
          >
            <div class="d-flex justify-space-between pb-2">
              <h2>{{ btnClick ? 'novo usuario' : 'permissões' }}</h2>
              <v-btn class="white--text" color="blue" @click="changebutton">
                <span>{{
                  btnClick ? 'editar permissão' : 'registro de usuario'
                }}</span></v-btn
              >
            </div>

            <v-form v-if="btnClick" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="obj.Name"
                label="Nome"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="obj.Email"
                :rules="emailRules"
                label="Email"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="obj.Password"
                type="password"
                label="Senha"
                required
                outlined
              ></v-text-field>
            </v-form>
            <v-select
              v-if="!btnClick"
              label="Email do usuario"
              v-model="obj.Email"
              :items="items"
              :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
              item-text="email"
              item-value="email"
              required
              outlined
              @change="func"
            ></v-select>
            <div class="ma-0 pt-2">
              <v-radio-group v-model="obj.permission">
                <v-radio
                  v-for="(item, index) in permissions"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></v-radio>
              </v-radio-group>
            </div>
            <v-btn
              color="success"
              class="mr-4"
              :loading="loading"
              @click="CreateUser"
            >
              {{ btnClick ? 'Registrar' : 'Editar' }}
            </v-btn>
          </v-card>
        </v-flex>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.userId = this.$store.state.user.user.id
    this.UserList()
  },
  data: () => ({
    userId: null,
    btnClick: true,
    permissions: [
      { name: 'Admin', value: 0 },
      { name: 'operador', value: 1 },
      { name: 'visualizador', value: 2 },
    ],
    loading: false,
    valid: true,
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    obj: {
      Name: '',
      Email: '',
      Password: '',
      permission: 0,
    },
    items: [],
  }),

  methods: {
    async CreateUser() {
      if (this.btnClick) {
        await this.$axios
          .$post(`user/post`, this.obj)
          .then((response) => {
            this.$toast.success(response)
          })
          .catch((error) => {
            this.$toast.error(error.response.data)
          })
      } else {
        this.updateUserPermission()
      }
    },
    changebutton() {
      this.btnClick = !this.btnClick
      this.obj.Name = ''
      this.obj.Email = ''
      this.obj.Password = ''
      this.obj.permission = 0
      this.UserList()
    },
    async UserList() {
      await this.$axios
        .$get(`user/get`)
        .then((response) => {
          this.items = response
        })
        .catch(() => {})
    },
    func() {
      const aux = this.items.filter((x) => x.email === this.obj.Email)[0]
      if (aux != null) {
        this.obj.permission = aux.permission
        this.obj.Name = aux.name
        this.obj.Password = aux.password
      }
    },
    async updateUserPermission() {
      await this.$axios
        .$put(`user/edit-permission`, this.obj)
        .then((response) => {
          this.$toast.success(response.msg)
          if (response.user.email === this.$store.state.user.user.email) {
            this.$store.dispatch('user/update', response.user)
            this.$router.push('/listaproduto')
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
  },
}
</script>
