export default {
  setUser(state, payload) {
    state.user = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setExpires(state, payload) {
    state.dateExpires = payload
  },
 
  logOut(state) {
    state.user = null
    state.token = null
    state.dateExpires = null
    this.$router.push('/')
  },
}
