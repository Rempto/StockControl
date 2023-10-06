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
              <h2 id="title" class="mb-3 ml-1">Historico de movimentações</h2>
            </v-flex>
            <p class="paragraph-2">Visualize detalhes sobre as movimentações</p>
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
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '8' : '4'" class="pa-0">
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

      <v-btn
        class="white--text pa-0 mt-2 mb-2"
        color="blue"
        @click="openFilter"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-card
        v-if="filter"
        class="primary-card pa-4 mt-2 theme--light"
        xs10
        style="border-radius: 20px"
      >
        <div class="caption grey--text ma-0 pa-0">filtros</div>
        <v-row class="ma-0 pa-0" style="align-items: center">
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '10' : '4'"
            class="pa-0 ml-2 mr-2"
          >
            <v-select
              hide-details="auto"
              item-text="name"
              item-value="value"
              label="Filtrar por Movimentação"
              v-model="move"
              @change="filtered"
              :items="items"
            ></v-select>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '10' : '4'"
            class="pa-0 ml-2"
          >
            <v-select
              hide-details="auto"
              item-text="name"
              item-value="value"
              label="Filtrar por Mês"
              v-model="month"
              @change="filtered"
              :items="months"
            ></v-select>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '6' : '3'"
            class="ml-4 pa-4"
          >
            <v-btn class="white--text pa-2" color="blue" @click="filterclear">
              Limpar filtro
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-card
      class="primary-card pa-4 theme--light"
      xs10
      style="border-radius: 20px"
    >
      <h2>Movimentações</h2>
      <v-row justify-center>
        <v-flex xs12 lg12 pa-4>
          <v-simple-table>
            <template>
              <thead style="background-color: #f5f5f5">
                <tr>
                  <th class="text-left">Produto</th>
                  <th class="text-left">Preço unitario</th>
                  <th class="text-left">Qtd</th>
                  <th class="text-left">Valor total</th>
                  <th class="text-left">Movimentação</th>
                  <th class="text-left">Data</th>
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
                <tr v-for="item in movement" :key="item.id">
                  <td>{{ item.productName }}</td>
                  <td>R$ {{ item.priceUnit.toFixed(2) }}</td>
                  <td>{{ item.qtd }}</td>
                  <td>R$ {{ item.priceTotal.toFixed(2) }}</td>
                  <td>{{ item.moveName }}</td>
                  <td>
                    {{ $moment(item.date).format('DD/MM/yyyy HH:mm:ss') }}
                  </td>

                  <td class="text-center">
                    <v-dialog transition="dialog" max-width="600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="userPermission !== 2"
                          @click="getMovement(item.id)"
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
                                v-model="returnMovement.productName"
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
                                v-model="returnMovement.qtd"
                                type="number"
                                label="Quantidade"
                                required
                                outlined
                              ></v-text-field>

                              <v-radio-group v-model="returnMovement.move">
                                <v-radio
                                  v-for="(item, index) in moves"
                                  :key="index"
                                  :label="item.name"
                                  :value="item.value"
                                  style="width: 50px"
                                ></v-radio>
                              </v-radio-group>
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="
                                updateMovement() && (dialog.value = false)
                              "
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
                    <v-dialog
                      v-if="userPermission !== 2"
                      transition="dialog"
                      max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon rounded light>
                          <v-icon> mdi mdi-trash-can-outline </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary" dark>
                            Excluir movimentação</v-toolbar
                          >
                          <v-card-text>
                            <div class="text-h5 pa-8">
                              Deseja excluir esta movimentação?
                            </div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              color="success"
                              text
                              @click="deleteMovement(item.id)"
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
        </v-flex>
      </v-row>
    </v-card>
    <div class="text-center pa-10">
      <v-pagination
        :length="totalPages"
        v-model="page"
        @input="paginationMovement"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moves: [
        { name: 'Saida', value: 0 },
        { name: 'Entrada', value: 1 },
      ],
      userPermission: null,
      filter: false,
      items: [
        { name: 'Entrada', value: 1 },
        { name: 'Saida', value: 0 },
      ],
      months: [
        { name: 'janeiro', value: 1 },
        { name: 'fevereiro', value: 2 },
        { name: 'março', value: 3 },
        { name: 'abril', value: 4 },
        { name: 'maio', value: 5 },
        { name: 'junho', value: 6 },
        { name: 'julho', value: 7 },
        { name: 'agosto', value: 8 },
        { name: 'setembro', value: 9 },
        { name: 'outubro', value: 10 },
        { name: 'novembro', value: 11 },
        { name: 'dezembro', value: 12 },
      ],
      month: '',
      move: '',
      searchKeyword: '',
      movement: [],
      returnMovement: {
        id: null,
        productName: null,
        qtd: 0,
        move: null,
      },
      page: 1,
      itens: 10,
      totalPages: 1,
    }
  },
  created() {
    this.userPermission = this.$store.state.user.user.permission
    this.userId = this.$store.state.user.user.id
    this.paginationMovement()
  },

  methods: {
    async getMovement(id) {
      await this.$axios
        .$get(`movement/getbyid?id=${id}`)
        .then((response) => {
          console.log(response)
          this.returnMovement.id = response.id
          this.returnMovement.productName = response.productName
          this.returnMovement.qtd = response.qtd
          this.returnMovement.move = response.move
        })
        .catch(() => {})
    },
    async updateMovement() {
      await this.$axios
        .$put(`movement/edit`, this.returnMovement)
        .then((response) => {
          this.$toast.success(response)
          this.paginationMovement()
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
    async deleteMovement(id) {
      await this.$axios
        .$delete(`movement/delete?id=${id}&userId=${this.userId}`)
        .then((response) => {
          this.$toast.success(response)
          this.paginationMovement()
        })
        .catch(() => {})
    },

    addButton() {
      this.$router.push('/movimentacao')
    },
    async paginationMovement() {
      await this.$axios
        .$get(
          `movement/getmovements?skip=${(this.page - 1) * this.itens}&take=${
            this.itens
          }&search=${this.searchKeyword}&Move=${this.move}&month=${this.month}`
        )
        .then((response) => {
          this.movement = response.movements
          this.totalPages = response.totalPages
          console.log(this.movement)
        })
        .catch(() => {})
    },
    openFilter() {
      this.filter = !this.filter
      if (this.filter === false) {
        this.filterclear()
      }
    },
    filterclear() {
      this.move = ''
      this.month = ''
      this.paginationMovement()
    },
    filtered() {
      this.page = 1
      this.paginationMovement()
    },
  },
}
</script>
