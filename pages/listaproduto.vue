<template>
    
    <v-card class="pa-10">
        <h2>Produtos</h2>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nome
          </th>
          <th class="text-left">
            Preço unitario
          </th>
          <th class="text-left">
            Qtd
          </th>
          <th role="columnheader" scope="col" aria-label="" class="text-center"><span></span></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
        >
          <td>{{ product.name}}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stockAmount }}</td>
          <td class="text-center">
            <a   class="edit-button v-btn v-btn--icon v-btn--round v-btn--router theme--light v-size--default keenerGrey--text">
              <span class="v-btn__content">
                <i  aria-hidden="true" class="v-icon notranslate mdi mdi-pencil-outline theme--light"></i>
              </span>
            </a>
             <button  type="button" class="delete-button v-btn v-btn--icon v-btn--round theme--light v-size--default">
              <span class="v-btn__content"><i  aria-hidden="true" class="v-icon notranslate mdi mdi-trash-can-outline theme--light">

              </i>
            </span>
          </button>
        </td>
          <!-- <td>{{ item.qtd }}</td> -->
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</v-card>
</template>

<script>
  export default {
    created(){
      console.log("OIBATI")
      this.ProductList()

    },

    methods:{
      async ProductList(){
      await this.$axios.$get(`product/get`).then(
        (response)=>{
        this.products= response;
        
        }
        ).catch((error)=>{
      console.log(error.response)})
    }
      },
   data () {
      return {
        products: [

        ],
      }
    }
 }
</script>