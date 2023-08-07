<template>
  <div>
    <header>
      <v-card class=" pa-8 theme--light" style="border-radius: 20px; margin-top: 5px;">
        <v-row>
          <v-col>
            <v-flex>
              <!---->
              <h2 id="title" class=" mb-3 ml-1">Produtos</h2>
            </v-flex>
            <p class="paragraph-2">Cadastre seus produtos no estoque</p>
          </v-col>
        </v-row>
      </v-card>
    </header>

    <div class="pa-2 primary-card">
      <v-btn class="d-flex white--text" color="blue" @click="backButton">
        <v-icon dark left>
          mdi-arrow-left
        </v-icon>Back
      </v-btn>
    </div>
    <div class="pa-3">
      <v-row>
        <v-col xs12 lg6 sm4 md6>
          <CardProduto @product="CreateProduct"></CardProduto>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async CreateProduct(obj) {
      await this.$axios
        .$post(`product/post`, obj)
        .then((response) => {
          this.$toast.success(response)
          this.backButton()
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
    backButton() {
      this.$router.push('/listaproduto')
    }
  },
}
</script>
