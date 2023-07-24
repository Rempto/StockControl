<template>
  <v-card class="pa-5" max-width="374">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
       v-model="obj.ProductId" 
       :items="items"
       :rules="[(v)=> !!v && v.length > 0  || 'Campo obrigatório']"
       item-text="name" 
       item-value="id" 
       @change="func"
       required
       outlined></v-select>

      <v-text-field 
      v-model="obj.Qtd" 
      type="number"
      label="Quantidade"
      required 
      outlined>
     </v-text-field>
     <v-text-field 
      v-model="obj.PriceUnit"
      label="Preço Unitario"
      required 
      outlined
      disabled>
     </v-text-field>
     <!-- v-model="obj.PriceTotal" -->
     <v-text-field
     :value="totalPrice"
      label="Valor Total"
      required 
      outlined
      disabled>
      </v-text-field>
      <v-radio-group v-model="obj.Move">
        <v-radio v-for="(item,index) in movements" :key="index" :label="item.name" :value="item.value"></v-radio>
    
      </v-radio-group>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate" :loading="loading">
        Registrar
      </v-btn>
    </v-form>

  </v-card>
</template>

<script>
export default {
  created() {
    this.ProductList()
  },
  computed:{
    totalPrice(){
      return this.obj.Qtd * this.obj.PriceUnit
    },
  },
  data() {
    return {
      loading: false,
      valid: true,
      items: [],
      obj: {
        ProductName: "",
        Qtd: 1,
        PriceUnit: 0,
        PriceTotal: 0,
        Move: 0,
        ProductId: "",
        UserId: "0ed4baf5-16a4-4bc5-9513-5fe5b134c7a9",
      },
      movements:[
        {name:"Saida",value:0},
        {name:"Entrada",value:1},
      ]
    }
  },
 
  methods: {
     validate() {
      if(!this.$refs.form.validate()){
       
        return;
      }
      this.updateProduct()
      
      this.obj.PriceTotal = this.totalPrice
      this.$emit("movimentacao", this.obj)
      this.reserve()
      this.refresh()
    },
    async ProductList() {
      await this.$axios.$get(`product/get`).then(
        (response) => {
          this.items = response;
        }
      ).catch((error) => {
        console.log(error.response.data)
      })
    },
   func(){
    const aux = this.items.filter((x) => x.id === this.obj.ProductId)[0];
    if(aux != null){
      this.obj.PriceUnit = aux.price;
      this.obj.ProductName= aux.name;
    }
    },
     async updateProduct(){
      const aux = this.items.filter((x) => x.id === this.obj.ProductId)[0];
      const prod = {
        id:aux.id,
        name:aux.name,
        price:aux.price,
        stockAmount:0
      }
      if(this.obj.Move===0){
        prod.stockAmount=aux.stockAmount - this.obj.Qtd
      }
      else{
        prod.stockAmount=aux.stockAmount +parseInt( this.obj.Qtd)
      }
      console.log(prod)
      await this.$axios.$put(`product/edit`, prod).then((response) => {
         console.log("teste", response)
      })
    
     
  },
  refresh(){
        this.obj.ProductName= ""
        this.obj.Qtd= 1
        this.obj.ProductId= ""
  },
  reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
}
}
</script>