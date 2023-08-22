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
              <h2 id="title" class="mb-3 ml-1">Estoque de Produtos</h2>
            </v-flex>
            <p class="paragraph-2">
              Visualize detalhes sobre os produtos em estoque
            </p>
          </v-col>
        </v-row>
      </v-card>
    </header>
    <div class="pa-2 primary-card">
      <v-row class="ma-0 justify-space-between" style="align-items: center">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '2' : '6'" class="pa-0">
          <v-btn
            v-if="userPermission !== 2"
            class="white--text"
            color="blue"
            @click="addButton"
          >
            <span v-if="!$vuetify.breakpoint.xs">adicionar</span>
            <v-icon size="15">mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col
          :cols="$vuetify.breakpoint.smAndDown ? '8' : '4'"
          class="pa-0"
          justify-end
        >
          <v-text-field
            v-model="searchKeyword"
            label="pesquisar"
            filled
            rounded
            dense
            hide-details="auto"
            @input="filtered"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-card
      class="primary-card pa-4 theme--light"
      style="border-radius: 20px; margin-top: 5px"
    >
      <h2>Produtos</h2>
      <v-row justify-center>
        <v-flex xs12 lg12 pa-4>
          <v-simple-table>
            <template>
              <thead style="background-color: #f5f5f5">
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Preço unitario</th>
                  <th class="text-left">Qtd</th>
                  <th class="text-left">Valor de revenda</th>
                  <th
                    role="columnheader"
                    scope="col"
                    aria-label=""
                    class="text-center"
                  >
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>R$ {{ product.price.toFixed(2) }}</td>
                  <td>{{ product.stockAmount }}</td>
                  <td>R$ {{ product.priceSale.toFixed(2) }}</td>
                  <td class="text-center">
                    <v-dialog transition="dialog" max-width="600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="userPermission !== 2"
                          @click="getProduct(product.id)"
                          v-bind="attrs"
                          v-on="on"
                          icon
                          rounded
                          light
                        >
                          <v-icon> mdi mdi-pencil-outline </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary" dark
                            >Editar Produto</v-toolbar
                          >
                          <v-card-text>
                            <div class="text-h2 pa-8">
                              <v-text-field
                                v-model="prod.name"
                                :rules="[
                                  (v) =>
                                    (!!v && v.length > 0) ||
                                    'Campo obrigatório',
                                ]"
                                label="Nome"
                                required
                                outlined
                              ></v-text-field>

                              <v-text-field
                                v-model="prod.price"
                                type="number"
                                label="Preço unitario"
                                prefix="R$"
                                required
                                outlined
                              ></v-text-field>

                              <v-text-field
                                v-model="prod.stockAmount"
                                type="number"
                                label="Quantidade"
                                required
                                outlined
                              ></v-text-field>

                              <v-text-field
                                v-model="prod.priceSale"
                                type="number"
                                label="Valor de revenda"
                                prefix="R$"
                                required
                                outlined
                              ></v-text-field>
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn text @click="updateProduct"
                              ><v-icon small> mdi mdi-pencil </v-icon
                              >Editar</v-btn
                            >

                            <v-btn text @click="dialog.value = false"
                              ><v-icon small> mdi mdi-cancel </v-icon
                              >Cancelar</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>

                    <v-dialog transition="dialog" max-width="600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="userPermission !== 2"
                          @click="getProduct(product.id)"
                          v-bind="attrs"
                          v-on="on"
                          icon
                          rounded
                          light
                        >
                          <v-icon> mdi mdi-trash-can-outline </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary" dark>
                            Excluir produto</v-toolbar
                          >
                          <v-card-text>
                            <div class="text-h5 pa-8">
                              Deseja excluir este produto?
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn color="success" text @click="deleteprod"
                              >Sim</v-btn
                            >
                            <v-btn
                              color="error"
                              text
                              @click="dialog.value = false"
                              >Não</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex></v-row
      >
    </v-card>

    <div class="text-center pa-10">
      <v-pagination
        :length="totalPages"
        v-model="page"
        @input="paginationProd"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPermission: null,
      searchKeyword: '',
      products: [],
      prod: {
        id: '',
        name: '',
        stockAmount: 0,
        price: null,
        userId: '0ed4baf5-16a4-4bc5-9513-5fe5b134c7a9',
        priceSale: 0,
      },

      page: 1,
      itens: 10,
      totalPages: 1,
    }
  },
  created() {
    this.userPermission = this.$store.state.user.user.permission
    this.paginationProd()
  },
  methods: {
    addButton() {
      this.$router.push('/produtoRegistro')
    },
    async getProduct(id) {
      await this.$axios
        .$get(`product/getbyid?id=${id}`)
        .then((response) => {
          this.prod.id = response.id
          this.prod.name = response.name
          this.prod.price = response.price
          this.prod.stockAmount = response.stockAmount
          this.prod.priceSale = response.priceSale
        })
        .catch(() => {})
    },
    async deleteprod() {
      await this.$axios
        .$delete(`product/delete?id=${this.prod.id}`)
        .then((response) => {
          this.$toast.success(response)
          this.paginationProd()
        })
        .catch(() => {})
    },
    async updateProduct() {
      await this.$axios
        .$put(`product/edit`, this.prod)
        .then((response) => {
          this.$toast.success(response)
          this.paginationProd()
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },

    async paginationProd() {
      await this.$axios
        .$get(
          `product/getproducts?Skip=${(this.page - 1) * this.itens}&Take=${
            this.itens
          }&search=${this.searchKeyword}`
        )
        .then((response) => {
          this.products = response.products
          this.totalPages = response.totalPages
        })
        .catch(() => {})
    },
    filtered() {
      this.page = 1
      this.paginationProd()
    },
  },
}
</script>
