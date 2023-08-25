<template>
  <v-card
    class="primary-card pa-10 theme--light"
    style="border-radius: 20px; margin-top: 5px"
  >
    <h2>nova movimentação</h2>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        label="Produto"
        v-model="obj.ProductId"
        :items="items"
        :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']"
        item-text="name"
        item-value="id"
        required
        outlined
        @change="func"
      ></v-select>

      <v-text-field
        v-model="obj.Qtd"
        type="number"
        label="Quantidade"
        required
        outlined
      >
      </v-text-field>
      <v-text-field
        v-model="obj.PriceUnit"
        label="Preço Unitario"
        required
        outlined
        disabled
      >
      </v-text-field>
      <!-- v-model="obj.PriceTotal" -->
      <v-text-field
        :value="totalPrice"
        label="Valor Total"
        required
        outlined
        disabled
      >
      </v-text-field>
      <v-radio-group v-model="obj.Move" @change="func2">
        <v-radio
          v-for="(item, index) in movements"
          :key="index"
          :label="item.name"
          :value="item.value"
        ></v-radio>
      </v-radio-group>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        :loading="loading"
        @click="validate"
      >
        Registrar
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      valid: true,
      items: [],
      obj: {
        ProductName: '',
        Qtd: 1,
        PriceUnit: 0,
        PriceTotal: 0,
        Move: 0,
        ProductId: '',
        UserId: '',
      },
      movements: [
        { name: 'Saida', value: 0 },
        { name: 'Entrada', value: 1 },
      ],
    }
  },
  computed: {
    totalPrice() {
      return this.obj.Qtd * this.obj.PriceUnit
    },
  },
  created() {
    this.ProductList()
    this.obj.UserId = this.$store.state.user.user.id
  },

  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.obj.PriceTotal = this.totalPrice
      this.$emit('movimentacao', this.obj)
      // this.loading = true
    },
    async ProductList() {
      await this.$axios
        .$get(`product/get`)
        .then((response) => {
          this.items = response
        })
        .catch(() => {})
    },
    func() {
      const aux = this.items.filter((x) => x.id === this.obj.ProductId)[0]
      if (aux != null) {
        this.obj.PriceUnit = aux.priceSale
        this.obj.ProductName = aux.name
      }
    },
    func2() {
      const aux = this.items.filter((x) => x.id === this.obj.ProductId)[0]
      if (aux != null) {
        if (this.obj.Move === 0) {
          this.obj.PriceUnit = aux.priceSale
        } else {
          this.obj.PriceUnit = aux.price
        }
      }
    },
  },
}
</script>
