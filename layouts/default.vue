<template>
  <v-app dark>
    <v-navigation-drawer style="background-color: #f5f5f5;" v-model="drawer" :mini-variant="miniVariant"
      :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="blue">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer />
      <div>
        <cardAvatar></cardAvatar>
      </div>

    </v-app-bar>
    <v-main style="background-color: #f5f5f5;">
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
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-widgets",
          title: "Estoque",
          to: "/listaproduto",
        },
        {
          icon: " mdi-arrow-up-bold-box-outline",
          title: "Lista de movimentação",
          to: "/listamovimentacao",
        },
        {
          icon: " mdi-finance",
          title: "Graficos",
          to: "/graphs",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Estoque",
    };
  },


}
</script>
