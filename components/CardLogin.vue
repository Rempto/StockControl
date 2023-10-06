<template>
  <v-card
    class="primary-card pa-8 v-card v-sheet theme--light pa-10"
    style="border-radius: 20px; margin-top: 5px"
  >
    <h2>{{ title }}</h2>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-if="!isLogin"
        v-model="obj.Name"
        label="Nome"
        :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
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
        :type="seePassword ? 'text' : 'password'"
        label="Senha"
        :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
        required
        outlined
        :append-icon="'mdi-eye'"
        @click:append="seePassword = !seePassword"
      ></v-text-field>

      <v-row class="ma-0">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '8' : '8'" class="pa-0">
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="success"
            @click="AlertOn"
          >
            {{ isLogin ? 'Logar' : 'Registrar' }}
          </v-btn>
        </v-col>
      </v-row>

      <div v-if="isLogin" class="ma-0 pt-2">
        <NuxtLink to="/forgetpassword">Esqueci minha senha</NuxtLink>
      </div>
      <div v-if="!isLogin" class="ma-0 pt-2">
        <v-radio-group v-model="obj.permission">
          <v-radio
            v-for="(item, index) in permissions"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></v-radio>
        </v-radio-group>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    seePassword: false,
    permissions: [
      { name: 'Admin', value: 0 },
      { name: 'operador', value: 1 },
      { name: 'visualizador', value: 2 },
    ],
    loading: false,
    valid: true,
    emailRules: [
      (v) => !!v || 'Um E-mail é necessario',
      (v) => /.+@.+\..+/.test(v) || 'O E-mail não é valido',
    ],
    obj: {
      Name: '',
      Email: '',
      Password: '',
      permission: 0,
    },
  }),
  methods: {
    AlertOn() {
      if (!this.isLogin) {
        this.$emit('register', this.obj)
      } else {
        this.$emit('login', this.obj)
      }
      // this.loading = true
      // return alert("OLA FUI CLICADO!")
    },
  },
}
</script>
