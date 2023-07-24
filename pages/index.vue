<template>
  <div class="d-flex justify-center mt-12">
      <card-login title="Login" :is-login="true" @login="LoginUser" ></card-login>
  </div>
</template>
<script>
  export default{
    layout:'login',

    methods:{
       async LoginUser(obj){
        await this.$store.dispatch('user/login',obj)
    },
      data () {
      return {
        
      }
    },
    }
  }

</script>