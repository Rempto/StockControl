<template>
    <CardProduto @product="CreateProduct"></CardProduto>
</template>


<script>
export default{
    methods:{
      async CreateProduct(obj){
      console.log(obj)
      await this.$axios.$post(`product/post`,obj).then((response)=>{
        this.$toast.success(response)
    }).catch(()=>{
      
    });
      }
    }
  }

</script>