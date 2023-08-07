<template>
  <v-card max-width="600" class=" primary-card pa-10  theme--light" style="border-radius: 20px; margin-top: 5px;">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="obj.Name" :rules="[(v) => (!!v && v.length > 0) || 'Campo obrigatório']" label="Nome"
        required outlined></v-text-field>

      <v-text-field v-model="obj.Price" type="number" label="Preço unitario" prefix="R$" required outlined></v-text-field>

      <v-text-field v-model="obj.PriceSale" type="number" label="Preço revenda" prefix="R$" required
        outlined></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" :loading="loading" @click="validate">
        Registrar
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  created() {
    this.obj.userId = this.$store.state.user.user.id
  },
  data: () => ({
    loading: false,
    valid: true,
    obj: {
      Name: '',
      Price: null,
      PriceSale: null,
      StockAmount: 0,
      userId: ''
    },
  }),

  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.$emit('product', this.obj)
      // this.loading=true
    },

  },
}
</script>
