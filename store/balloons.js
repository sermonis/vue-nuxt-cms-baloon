export const state = () => ({
  list: []
});

export const actions = {
  async fetchBalloons(store){
    try {
      const { data } = await this.$axios.post('balloon-service/balloon/list');
      store.commit('SET_BALLOONS', data);
    } catch (error) {
      this.$notifier.showMessage( { message : error.response.data } );
    }
  }
}

export const mutations = {
  SET_BALLOONS(state, data) {
    state.list = data
  },
  SET_USER(state, user) {
    state.user = user
  },
  LOGOUT(state) {
    state.token = null;
    state.user = null;
    this.$cookies.remove('sid');
  },
}