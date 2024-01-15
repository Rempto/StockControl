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
              <h2 id="title" class="mb-3 ml-1">Cadastro de Movimentação</h2>
            </v-flex>
            <p class="paragraph-2">Faça suas movimentações</p>
          </v-col>
        </v-row>
      </v-card>
    </header>
    <div class="pa-2 primary-card">
      <v-btn class="d-flex white--text" color="blue" @click="backButton">
        <v-icon dark left> mdi-arrow-left </v-icon>Back
      </v-btn>
    </div>
    <div class="pa-3">
      <v-row>
        <v-flex xs12 lg6 sm4 md6>
          <CardMovimentacao @movimentacao="getProduct"></CardMovimentacao>
        </v-flex>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async CreateMovement(obj) {
      await this.$axios
        .$post(`movement/post`, obj)
        .then((response) => {
          this.$toast.success(response)
          this.backButton()
        })
        .catch(() => {})
    },
    backButton() {
      this.$router.push('/listamovimentacao')
    },
    async getProduct(obj) {
      await this.$axios
        .$get(`product/get-by-id?id=${obj.ProductId}`)
        .then((response) => {
          const prod = {
            id: response.id,
            name: response.name,
            price: response.price,
            priceSale: response.priceSale,
            stockAmount: 0,
          }
          if (obj.Move === 0) {
            prod.stockAmount = response.stockAmount - obj.Qtd
          } else {
            prod.stockAmount = response.stockAmount + parseInt(obj.Qtd)
          }
          if (prod.stockAmount >= 0) {
            this.CreateMovement(obj)
          } else {
            this.$toast.error('Quantidade acima do estoque!')
          }
        })
        .catch(() => {})
    },
  },
}
</script>
