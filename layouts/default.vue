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
            <v-btn
              class="notification-bell"
              :class="{ 'bell-ring': isNotification }"
              icon
              color="white"
              dark
              v-bind="attrs"
              v-on="on"
            >
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
            <v-container
              class="ma-0 pa-0"
              style="max-height: 300px; overflow-y: auto"
            >
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
            </v-container>
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
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" dark v-bind="attrs" v-on="on" to="/chats">
              <v-icon>mdi-message-text-outline</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </div>
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
    this.getPermission()
  },
  data() {
    return {
      chats: [],
      users: [],
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
      isNotification: false,

      listenersStarted: false,
      permissionGranted: false,
      idToken: '',
      loading: false,
    }
  },
  fetch() {
    this.messageSocket()
    this.getUserNotification()
  },
  methods: {
    async requestPermission() {
      try {
        const permission = await Notification.requestPermission()
        this.permissionGranted = permission === 'granted'
      } catch (e) {
        console.error(e)
      }
    },
    async getPermission() {
      await this.requestPermission()
      if (this.permissionGranted) {
        this.getIdToken()
      }
    },
    async getIdToken() {
      this.loading = true
      let currentToken
      try {
        currentToken = await this.$fire.messaging.getToken()
        if (currentToken) {
          await this.$axios
            .$post(
              `pushNotification/create-push-notification?token=${currentToken}&userId=${this.user.id}`
            )
            .then(() => {})
            .catch(() => {})
        }
      } catch (e) {
        console.error('an error ocurred ')
        this.idToken = ''
        this.loading = false
      }

      if (currentToken) {
        this.idToken = currentToken
      } else {
        this.idToken = ''
      }

      this.loading = false
    },

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
        await $context.getUserNotification()
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
          if (this.notifications.length > 0) {
            this.toggleNotification()
          }
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
    async cleanNotification() {
      await this.$axios
        .$put(`notification/set-all-visualized?userId=${this.user.id}`)
        .then(() => {
          this.getUserNotification()
        })
        .catch(() => {})
    },
    toggleNotification() {
      this.isNotification = true
      setTimeout(() => {
        this.isNotification = false
      }, 1000)
    },
  },
}
</script>

<style scoped>
.notification-bell {
  display: inline-block;
  cursor: pointer;
}

.bell-ring {
  animation: bellRingAnimation 0.5s ease-in-out;
  transform-origin: top center;
}

@keyframes bellRingAnimation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  60%,
  80% {
    transform: rotate(15deg);
  }
  40%,
  100% {
    transform: rotate(-15deg);
  }
}
</style>
