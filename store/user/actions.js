export default{
    async login({commit, dispatch},obj){
        await this.$axios.$post(`user/login`,obj).then((response)=>{
            commit('setUser',response.user);
            commit('setToken',response.token);
            commit('setExpires',response.dateExpires);

            this.$router.push("/produtoRegistro")
        }).catch((error)=>{
             this.$toast.error(error.response.data)
            })
    },

    logOut({commit, dispatch}){
        commit('logOut')
    }
}