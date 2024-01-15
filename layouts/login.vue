<template>
  <v-app dark>
    <v-main style="background-color: #193153">
      <v-container style="height: 100%; display: flex; align-items: center">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayer',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Login',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Registro',
          to: '/register',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
}
</script>
