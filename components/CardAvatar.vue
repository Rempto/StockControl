<template>
  <v-container>
    <v-menu bottom rounded>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="#f5f5f5" size="48">
            <v-img
              v-if="avatar"
              :src="avatar"
              style="
                border-radius: 80px;

                background-position: center center;

                background-position: center center;
              "
            >
            </v-img>
            <span v-if="!avatar" class="black--text text-h5">{{
              user.initials
            }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card min-width="150">
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="#f5f5f5">
              <v-img
                v-if="avatar"
                :src="avatar"
                style="
                  border-radius: 80px;

                  background-position: center center;
                "
              >
              </v-img>
              <span v-if="!avatar" class="black--text text-h5">{{
                user.initials
              }}</span>
            </v-avatar>
            <h3>{{ user.name }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="profileButton">
              Meu perfil
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn @click="logOut" :loading="loading" depressed rounded text>
              Sair
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  created() {
    this.user.name = this.$store.state.user.user.name
    this.user.email = this.$store.state.user.user.email
    this.user.initials = this.user.name[0]
    this.user.id = this.$store.state.user.user.id
    this.getuserAvatar()
  },

  data: () => ({
    avatar: null,
    loading: false,
    user: {
      initials: '',
      name: '',
      email: '',
      id: '',
    },
  }),

  methods: {
    logOut() {
      this.$store.dispatch('user/logOut')
    },
    profileButton() {
      this.$router.push('/profile')
    },
    async getuserAvatar() {
      await this.$axios
        .$get(`user/get-by-id?id=${this.user.id}`)
        .then((response) => {
          this.avatar = response.avatar
        })
        .catch(() => {})
    },
  },
}
</script>
