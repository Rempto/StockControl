<template>
  <div>
    <header>
      <v-card
        class="pa-5 theme--light"
        style="border-radius: 20px; margin-top: 5px"
      >
        <v-row>
          <v-col>
            <v-flex>
              <!---->
              <h2 id="title" class="mb-3 ml-1" style="color: #4c77b4">
                Estoque de Produtos
              </h2>
            </v-flex>
            <p class="paragraph-2">
              Aqui você poderá vizualizar, adicionar, editar, deletar e filtrar
              seus produtos em estoque!
            </p>
          </v-col>
        </v-row>
      </v-card>
    </header>
    <div class="pa-2 primary-card">
      <v-row
        class="ma-0 mt-5 mb-4 justify-space-between"
        style="align-items: center"
        :style="$vuetify.breakpoint.xs ? 'flex-direction: column-reverse;' : ''"
      >
        <v-col
          :cols="$vuetify.breakpoint.xs ? '12' : '6'"
          class="pa-0"
          justify-end
          :class="$vuetify.breakpoint.xs ? 'mt-3' : ''"
        >
          <v-text-field
            v-model="searchKeyword"
            label="pesquisar"
            filled
            rounded
            dense
            height="48"
            style="max-width: 250px; min-height: 40px !important"
            hide-details="auto"
            @input="filtered"
          >
          </v-text-field>
        </v-col>
        <v-col
          :cols="$vuetify.breakpoint.xs ? '12' : '6'"
          :class="$vuetify.breakpoint.xs ? '' : 'justify-end align-center'"
          class="pa-0 d-flex align-center"
        >
          <BtnIcon
            v-if="userPermission !== 2"
            :icon-loading="loading"
            :title="'Adicionar'"
            :btn-color="'#4c77b4'"
            :icon="'mdi-plus'"
            :icon-width="'40px !important'"
            :iconOnLeftSide="false"
            :hasInputBefore="false"
            height="40px"
            icon-size="22"
            @action="addDialog = true"
          >
          </BtnIcon>
        </v-col>
      </v-row>
    </div>
    <v-card
      class="primary-card pa-4 theme--light"
      style="border-radius: 20px; margin-top: 5px"
    >
      <h2 style="color: #4c77b4" class="ml-1">Produtos</h2>
      <v-row justify-center>
        <v-flex xs12 lg12 pa-4>
          <v-simple-table>
            <template>
              <thead style="background-color: #1d4071">
                <tr>
                  <th class="text-left" style="color: white; font-weight: bold">
                    Nome
                  </th>
                  <th class="text-left" style="color: white; font-weight: bold">
                    Preço unitario
                  </th>
                  <th class="text-left" style="color: white; font-weight: bold">
                    Valor de revenda
                  </th>
                  <th class="text-left" style="color: white; font-weight: bold">
                    Qtd
                  </th>

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
                  <td>R$ {{ product.priceSale.toFixed(2) }}</td>
                  <td>{{ product.stockAmount }}</td>

                  <td class="text-center">
                    <v-btn
                      v-if="userPermission !== 2"
                      icon
                      rounded
                      light
                      @click.prevent.stop="getProduct(product.id)"
                    >
                      <v-icon> mdi mdi-pencil-outline </v-icon>
                    </v-btn>

                    <v-btn
                      v-if="userPermission !== 2"
                      icon
                      rounded
                      light
                      @click.prevent.stop="openDeleteModel(product)"
                    >
                      <v-icon> mdi mdi-trash-can-outline </v-icon>
                    </v-btn>
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
        color="#4c77b4"
        @input="paginationProd"
      ></v-pagination>
    </div>

    <v-dialog v-model="editDialog" style="box-shadow: none"
      ><div class="d-flex justify-center">
        <v-card max-width="500px" class="pa-9">
          <div class="d-flex justify-center">
            <h1 class="">Editar Produto</h1>
          </div>
          <v-card-text class="pa-0">
            <div class="text-h2">
              <v-text-field
                v-model="prod.name"
                :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
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
            <BtnIcon
              class="mr-2"
              title="Cancelar"
              :btn-color="'#c4c4c4'"
              :icon="'mdi-close'"
              :icon-width="'40px !important'"
              height="40px"
              icon-size="22"
              @action="editDialog = false"
            >
            </BtnIcon>
            <BtnIcon
              :icon-loading="loading"
              title="Editar"
              :btn-color="'#1d4071'"
              :icon="'mdi-pencil'"
              :icon-width="'40px !important'"
              height="40px"
              icon-size="22"
              @action="updateProduct()"
            >
            </BtnIcon>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="deleteDialog">
      <div class="d-flex justify-center">
        <v-card max-width="400px" class="pa-6">
          <v-card-text>
            <div class="text-h5 pa-8">
              Tem certeza que deseja excluir este produto?
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <BtnIcon
              class="mr-2"
              title="Não"
              :btn-color="'#c4c4c4'"
              :icon="'mdi-close'"
              :icon-width="'40px !important'"
              height="40px"
              icon-size="22"
              @action="deleteDialog = false"
            >
            </BtnIcon>
            <BtnIcon
              :icon-loading="loading"
              title="Sim"
              :btn-color="'#1d4071'"
              :icon="'mdi-check'"
              :icon-width="'40px !important'"
              height="40px"
              icon-size="22"
              @action="deleteprod"
            >
            </BtnIcon>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="addDialog">
      <div class="d-flex justify-center">
        <CardProduto
          :loading="loadingAddProduct"
          @product="CreateProduct"
        ></CardProduto>
      </div>
    </v-dialog>
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
        userId: null,
        priceSale: 0,
      },

      page: 1,
      itens: 10,
      totalPages: 1,
      loading: false,
      editDialog: false,
      deleteDialog: false,
      selectedProduct: {},
      addDialog: false,
      loadingAddProduct: false,
    }
  },
  created() {
    this.userPermission = this.$store.state.user.user.permission
    this.prod.userId = this.$store.state.user.user.id
    this.paginationProd()
  },
  methods: {
    async CreateProduct(obj) {
      this.loadingAddProduct = true
      await this.$axios
        .$post(`product/add`, obj)
        .then((response) => {
          this.$toast.success(response)
          this.loadingAddProduct = false
          this.addDialog = false
          this.paginationProd()
        })
        .catch(() => {
          this.loadingAddProduct = false
        })
    },

    openDeleteModel(product) {
      this.selectedProduct = product
      this.deleteDialog = true
    },

    addButton() {
      this.$router.push('/produtoRegistro')
    },

    async getProduct(id) {
      await this.$axios
        .$get(`product/get-by-id?id=${id}`)
        .then((response) => {
          this.prod.id = response.id
          this.prod.name = response.name
          this.prod.price = response.price
          this.prod.stockAmount = response.stockAmount
          this.prod.priceSale = response.priceSale
          this.editDialog = true
        })
        .catch(() => {})
    },

    async deleteprod() {
      await this.$axios
        .$delete(
          `product/delete?id=${this.selectedProduct.id}&userId=${this.prod.userId}`
        )
        .then((response) => {
          this.deleteDialog = false
          this.$toast.success(response)
          this.paginationProd()
        })
        .catch(() => {})
    },

    async updateProduct(value) {
      await this.$axios
        .$put(`product/edit`, this.prod)
        .then((response) => {
          this.$toast.success(response)
          this.paginationProd()
          this.editDialog = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },

    async paginationProd() {
      await this.$axios
        .$get(
          `product/get-products?Skip=${(this.page - 1) * this.itens}&Take=${
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
<style>
.v-dialog.v-dialog--active {
  box-shadow: none;
}
</style>
