


<template>
    <v-card class="pa-10" max-width="500">
        <h2>{{title}}</h2>
   <v-form
     ref="form"
     v-model="valid"
     lazy-validation
   >
     <v-text-field v-if="!isLogin"
       v-model="obj.Name"
       label="Nome"
       required
       outlined
     ></v-text-field>
 
     <v-text-field
       v-model="obj.Email"
       :rules="emailRules"
       label="Email"
       required
       outlined
     ></v-text-field>
 
     <v-text-field
     type="password"
       v-model="obj.Password"
       label="Senha"
       required
       outlined
     ></v-text-field>

     <div v-if="isLogin">
        <NuxtLink to="/register">Registrar</NuxtLink>
    </div>
 
     <v-btn
        :loading="loading"
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="AlertOn"
       
     >
     {{ isLogin ? "Logar" : "Registrar"  }}
     </v-btn>
   </v-form>

</v-card>
 </template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        isLogin:{
            type:Boolean,
            default:false
        }
    },
 data: () => ({
  loading: false,
   valid: true,
   emailRules: [
     v => !!v || 'E-mail is required',
     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
   ],
   obj:{
    Name:"",
    Email:"",
    Password:"",
   }
 }),
 methods: {
    AlertOn(){
      if(!this.isLogin){
      this.$emit("register",this.obj)
    }else{
      this.$emit("login",this.obj)
    }
    this.reserve()
      // return alert("OLA FUI CLICADO!")
   },
   reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
 },
}
</script>
