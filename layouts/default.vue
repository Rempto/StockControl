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
              <v-badge
                v-if="notifications.length > 0"
                bottom
                color="green"
                :content="notifications.length"
              ></v-badge>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              two-line
              v-for="(item, index) in notifications"
              :key="index"
              @click="setVizualized(item.id)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle class="pa-2">{{
                  item.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div class="d-flex justify-space-between">
              <v-btn class="pl-4" icon rounded light to="/notifications"
                ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
              >
              <v-btn
                v-if="notifications.length > 0"
                class="pr-4"
                icon
                rounded
                light
                @click="cleanNotification()"
              >
                <v-icon> mdi-eraser </v-icon>
              </v-btn>
            </div>
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
  destroy() {
    this.socketInstance.close()
  },
  created() {
    this.user.id = this.$store.state.user.user.id
    this.getuserpermission()
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
      socketInstance: null,
    }
  },
  fetch() {
    this.messageSocket()
    this.getUserNotification()
  },
  methods: {
    messageSocket() {
      if (this.socketInstance) {
        this.socketInstance.close()
      }

      this.socketInstance = new WebSocket(
        `${process.env.API_KEY_SOCKET}?chatId=${'adminNotifications'}&userId=${
          this.user.id
        }`
      )

      const $context = this
      this.socketInstance.onmessage = async function (e) {
        const socketMessage = await JSON.parse(e.data)
        console.log(socketMessage)
        $context.getUserNotification()
      }
    },
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
    cleanNotification() {
      this.notifications.forEach((notification) => {
        this.setVizualized(notification.id)
      })
    },
  },
}
</script>
