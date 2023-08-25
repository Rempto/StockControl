<template>
  <v-app dark>
    <v-navigation-drawer
      style="background-color: #f5f5f5"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="user.permission == 0" to="/adminRegister">
          <v-list-item-action>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registro de Usuario</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="blue">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="text-center">
        <v-menu offset-y v-if="user.permission == 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" dark v-bind="attrs" v-on="on">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in notifications"
              :key="index"
              @click="setVizualized(item.id)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.description
              }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item to="/notifications"
              ><v-list-item-title>...</v-list-item-title></v-list-item
            >
          </v-list>
        </v-menu>
      </div>
      <v-spacer />
      <div>
        <cardAvatar></cardAvatar>
      </div>
    </v-app-bar>
    <v-main style="background-color: #f5f5f5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  created() {
    this.user.id = this.$store.state.user.user.id
    this.getuserpermission()
    this.getUserNotification()
  },
  data() {
    return {
      notifications: [],
      user: {
        id: null,
        permission: null,
      },
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-widgets',
          title: 'Estoque',
          to: '/listaproduto',
        },
        {
          icon: ' mdi-arrow-up-bold-box-outline',
          title: 'Lista de movimentação',
          to: '/listamovimentacao',
        },
        {
          icon: ' mdi-finance',
          title: 'Graficos',
          to: '/graphs',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Estoque',
    }
  },
  methods: {
    async getuserpermission() {
      await this.$axios
        .$get(`user/getbyid?id=${this.user.id}`)
        .then((response) => {
          this.user.permission = response.permission
        })
        .catch(() => {})
    },
    async getUserNotification() {
      await this.$axios
        .$get(`notification/get-by-id?id=${this.user.id}`)
        .then((response) => {
          this.notifications = response
        })
        .catch(() => {})
    },
    async setVizualized(id) {
      await this.$axios
        .$put(`notification/set-visualized?id=${id}`)
        .then(() => {
          this.getUserNotification()
        })
        .catch(() => {})
    },
  },
}
</script>
