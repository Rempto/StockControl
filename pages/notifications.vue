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
              <h2 id="title" class="mb-3 ml-1">Notificações</h2>
            </v-flex>
            <p class="paragraph-2">Confira todas as atualizações no sistema</p>
          </v-col>
        </v-row>
      </v-card>
    </header>

    <div class="pa-2 primary-card">
      <v-btn class="d-flex white--text" color="blue" @click="backButton">
        <v-icon dark left> mdi-arrow-left </v-icon>Back
      </v-btn>
    </div>
    <v-card
      class="primary-card pa-4 theme--light"
      xs10
      style="border-radius: 20px"
    >
      <v-row justify-center>
        <v-flex xs12 lg12 pa-4>
          <v-simple-table>
            <template>
              <thead style="background-color: #f5f5f5">
                <tr>
                  <th class="text-left">Titulo</th>
                  <th class="text-left">Descrição</th>
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
                <tr
                  v-for="item in notifications"
                  :key="item.id"
                  @click="setVizualized(item.id)"
                >
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>

                  <td>
                    {{
                      $moment(item.createdAt)
                        .locale('pt-br')
                        .format('DD/MM/yyyy LT')
                    }}
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
        @input="paginationNotification"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: '',
      searchKeyword: '',
      notifications: [],
      page: 1,
      itens: 10,
      totalPages: 1,
      userId: null,
    }
  },
  mounted() {
    this.userId = this.$store.state.user.user.id
    this.paginationNotification()
  },

  methods: {
    backButton() {
      this.$router.push('/listamovimentacao')
    },
    async paginationNotification() {
      await this.$axios
        .$get(
          `notification/get?skip=${(this.page - 1) * this.itens}&take=${
            this.itens
          }&userId=${this.userId}`
        )
        .then((response) => {
          this.notifications = response.notification
          this.totalPages = response.totalPages
        })
        .catch(() => {})
    },
    async setVizualized(id) {
      await this.$axios
        .$put(`notification/set-visualized?id=${id}`)
        .then(() => {})
        .catch(() => {})
    },
  },
}
</script>
