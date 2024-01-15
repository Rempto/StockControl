<template>
  <v-card
    class="primary-card pa-10"
    style="border-radius: 20px; margin-top: 5px; max-width: 400px"
    :style="$vuetify.breakpoint.smAndUp ? 'width: 400px' : ''"
  >
    <div class="d-flex justify-center mb-8">
      <v-icon>mdi-arrow-left</v-icon>
      <h1>{{ title }}</h1>
    </div>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-if="!isLogin"
        v-model="obj.Name"
        height="48px"
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
        hide-details="auto"
      ></v-text-field>
      <div v-if="isLogin" class="ma-0 pt-2 mb-2 d-flex justify-center">
        <NuxtLink to="/forgetpassword">Esqueci minha senha</NuxtLink>
      </div>
      <div v-if="isLogin" class="ma-0 pt-2 mb-5 d-flex justify-center">
        <NuxtLink to="login/register">registrar</NuxtLink>
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
      <v-row class="ma-0">
        <v-col class="pa-0 d-flex justify-center">
          <BtnIcon
            :class="!isLogin ? 'mt-3' : ''"
            :icon-loading="loading"
            :title="isLogin ? 'Entrar' : 'Registrar'"
            :btn-color="'#1d4071'"
            :icon="'mdi-check'"
            :icon-width="'40px !important'"
            height="40px"
            icon-size="22"
            @action="submit"
          >
          </BtnIcon>
        </v-col>
      </v-row>
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
      { name: 'Operador', value: 1 },
      { name: 'Visualizador', value: 2 },
    ],
    loading: false,
    valid: true,
    emailRules: [
      (v) => !!v || 'Um email é necessario',
      (v) => /.+@.+\..+/.test(v) || 'O email não é valido',
    ],
    obj: {
      Name: '',
      Email: '',
      Password: '',
      permission: 0,
    },
  }),
  methods: {
    submit() {
      if (!this.isLogin) {
        if (!this.$refs.form.validate()) return
        this.loading = true
        this.$emit('register', this.obj)
      } else {
        this.loading = true
        this.$emit('login', this.obj)
      }

      // return alert("OLA FUI CLICADO!")
    },
  },
}
</script>
<style>
.v-text-field--filled > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outlined > .v-input__control > .v-input__slot {
  border-radius: 14px;
}
</style>
