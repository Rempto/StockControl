export default {
  async login({ commit, dispatch }, obj) {
    await this.$axios
      .$post(`user/login`, obj)
      .then((response) => {
        commit('setUser', response.user)
        commit('setToken', response.token)
        commit('setExpires', response.dateExpires)


        this.$router.push('/estoque')
      })
      .catch(() => {
      })
  },

  logOut({ commit, dispatch }) {
    commit('logOut')
  },

  update({ commit, dispatch }, obj) {
    commit('setUser', obj)
  }
}
