<template>
    <div class="d-flex justify-center mt-12">
        <card-login title="Registro" @register="CreateUser"></card-login>
    </div>
</template>

<script>
export default{
    layout:'login',
    methods:{
      async CreateUser(obj){
      console.log(obj)
      await this.$axios.$post(`user/post`,obj).then((response)=>{
      this.$toast.success(response)
    }).catch((error)=>{
      this.$toast.error(error.response.data)
    });
    }
  },
    data () {
      return {
        
      }
    }
}

</script>