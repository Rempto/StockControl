<template>
  <div>
    <header>
      <div class="primary-card pa-8 v-card v-sheet theme--light">
        <div class="row row--dense"><div class="col col-10">
          <div class="d-flex"><!----> <h2 id="title" class="title-h2 mb-3 ml-1">Movimentação</h2>
            </div> <p class="paragraph-2">Visualize detalhes sobre as movimentações</p>
          </div> 
          </div>
        </div>
      </header>
  <div class="d-flex mt-5">
    <v-row
      class="flex"
      justify="center"
    >
    <CardMovimentacao @movimentacao="CreateMovement"></CardMovimentacao>
    </v-row>
</div>
</div>
</template>


<script>
export default {
  methods: {
    async CreateMovement(obj) {
      console.log(obj)
      await this.$axios.$post(`movement/post`, obj).then((response) => {
        this.$toast.success(response)
        }).catch(() => {
       
      });
    },

    

  
}
}
</script>