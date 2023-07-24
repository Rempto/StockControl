<template>
    
    <v-card class="pa-10">
        <h2>Movimentações</h2>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Produto
          </th>
          <th class="text-left">
            Preço unitario
          </th>
          <th class="text-left">
            Qtd
          </th>
          <th class="text-left">
            Valor total
          </th>
          <th class="text-left">
            Movimentação
          </th>
          <th class="text-left">
            Data
          </th>
          <th role="columnheader" scope="col" aria-label="" class="text-center"><span></span></th>
          
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in movement"
          :key="item.name"
        >
          <td>{{ item.productName }}</td>
          <td>{{ item.priceUnit }}</td>
          <td>{{ item.qtd }}</td>
          <td>{{ item.priceTotal }}</td>
          <td>{{ item.moveName }}</td>
          <td>{{ item.date }}</td>
          <td>
          <button  type="button" class="delete-button v-btn v-btn--icon v-btn--round theme--light v-size--default">
              <span class="v-btn__content"><i  aria-hidden="true" class="v-icon notranslate mdi mdi-trash-can-outline theme--light">

              </i>
            </span>
          </button>
        </td>
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
      this.MovementList()

    },

    methods:{
      async MovementList(){
      await this.$axios.$get(`movement/get`).then(
        (response)=>{
        this.movement= response;
        }
        ).catch((error)=>{
      console.log(error.response)})
    }
      },
   data () {
      return {
        movement: [
        ],
      }
    }
  }
</script>