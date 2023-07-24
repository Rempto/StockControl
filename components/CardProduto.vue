<template>
     <v-card class="pa-5" max-width="374">
        <h2>Produtos</h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="obj.Name"
        :rules="[(v)=> !!v && v.length > 0  || 'Campo obrigatório']"
        label="Nome"
        required
        outlined
      ></v-text-field>
  
      <v-text-field
        v-model="obj.Price"
        type="number"
        label="Preço unitario"
        prefix="R$"
        required
        outlined
      ></v-text-field>
  
      <v-text-field
        v-model="obj.StockAmount"
        type="number"
        label="Quantidade"
        required
        outlined
      ></v-text-field>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        :loading="loading"
      >
        Registrar
      </v-btn>
    </v-form>

</v-card>
  </template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    obj:{
    Name:"",
    Price:null,
    StockAmount:null
   }
  }),

  methods: {
    validate () {
      if(!this.$refs.form.validate()){
       
       return;
     }
      this.$emit("product",this.obj)
      this.reserve()
    },
    reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
  },
}
</script>