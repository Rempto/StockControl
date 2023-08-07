<template>
  <div>
    <header>
      <v-card class=" pa-8 theme--light" style="border-radius: 20px; margin-top: 5px;">
        <v-row>
          <v-col>
            <v-flex>
              <!---->
              <h2 id="title" class=" mb-3 ml-1">Historico de movimentações</h2>
            </v-flex>
            <p class="paragraph-2">Visualize detalhes sobre as movimentações</p>
          </v-col>
        </v-row>
      </v-card>
    </header>

    <div class=" pa-2 primary-card">
      <v-row class="ma-0 justify-space-between" style="align-items: center;">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '2' : '6'" class="pa-0">
          <v-btn class="white--text" color="blue" @click="addButton">
            <span v-if="!$vuetify.breakpoint.xs">adicionar</span> <v-icon size="15">mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '8' : '4'" class="pa-0">
          <v-text-field v-model="searchKeyword" label="pesquisar" filled rounded dense hide-details="auto"
            @input="filtered">
          </v-text-field>

        </v-col>
      </v-row>

      <v-row class="ma-0" style="align-items: center;">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '2' : '1'" class="pa-0">
          <v-btn class="white--text" color="blue" @click="filterclear">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-col>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '6' : '4'" class="pa-0 pl-4" v-if="filter">
          <v-select item-text="name" item-value="value" v-model="move" @change="filtered" :items="items"></v-select>
        </v-col>

      </v-row>

    </div>
    <v-card class="primary-card pa-4 theme--light" xs10 style="border-radius: 20px;">

      <h2>Movimentações</h2>
      <v-row justify-center>
        <v-flex xs12 lg12 pa-4>
          <v-simple-table>
            <template>
              <thead style="background-color: #f5f5f5;">
                <tr>
                  <th class="text-left">Produto</th>
                  <th class="text-left">Preço unitario</th>
                  <th class="text-left">Qtd</th>
                  <th class="text-left">Valor total</th>
                  <th class="text-left">Movimentação</th>
                  <th class="text-left">Data</th>
                  <th role="columnheader" scope="col" aria-label="" class="text-center">
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
                  <td>{{ $moment(item.date).locale("pt-br").format("DD/MM/yyyy LTS") }}</td>
                  <td>
                    <v-dialog transition="dialog" max-width="600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" icon rounded light>
                          <v-icon>
                            mdi mdi-trash-can-outline
                          </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar color="primary" dark> Excluir movimentação</v-toolbar>
                          <v-card-text>
                            <div class="text-h5 pa-8">Deseja excluir esta movimentação?</div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn color="success" text @click="deleteMovement(item.id)">Sim</v-btn>
                            <v-btn color="error" text @click="dialog.value = false">Não</v-btn>
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
      <v-pagination :length="totalPages" v-model="page" @input="paginationMovement"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: false,
      items: [{ name: "Entrada", value: 1 }, { name: "Saida", value: 0 }],
      move: "",
      searchKeyword: "",
      movement: [],
      page: 1,
      itens: 10,
      totalPages: 1,
    }
  },
  mounted() {

    this.paginationMovement()
  },

  methods: {

    async deleteMovement(id) {
      await this.$axios.$delete(`movement/delete?id=${id}`).then((response) => {
        this.$toast.success(response)
        this.paginationMovement()
      }).catch(() => { })
    },

    addButton() {
      this.$router.push('/movimentacao')
    },
    async paginationMovement() {
      await this.$axios.$get(`movement/getmovements?skip=${(this.page - 1) * this.itens}&take=${this.itens}&search=${this.searchKeyword}&Move=${this.move}`)
        .then(response => {
          this.movement = response.movements;
          this.totalPages = response.totalPages

        })
        .catch(() => {
        });
    },
    filterclear() {
      this.filter = !this.filter
      if (this.filter === false) {
        this.move = " "
        this.paginationMovement()
      }

    },
    filtered() {
      this.page = 1
      this.paginationMovement()

    }


  },
}
</script>
