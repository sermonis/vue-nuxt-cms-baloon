export const state = () => ({
  list: [],
  companies: []
});

export const actions = {
  async fetchBalloons( store ){
    try {
      const { data } = await this.$axios.post('balloon-service/balloon/list');
      store.commit('SET_BALLOONS', data);
      store.commit('SET_COMPANIES', [{_id: "1", name: "company1"},{_id: "2", name: "company2"}]);
    } catch (error) {
      this.$notifier.showMessage( { message : error.response?.data || error } );
    }
  },
  async addBalloons( store, form ){
    try {
      const { data } = await this.$axios.post('balloon-service/balloon/add', form );
      store.commit('ADD_BALLOON', data);
    } catch (error) {
      this.$notifier.showMessage( { message : error.response?.data || error } );
    }
  }
}

export const mutations = {
  ADD_BALLOON(state, data) {
    state.list.push(data);
  },
  SET_BALLOONS(state, data) {
    state.list = data;
  },
  SET_COMPANIES(state, data) {
    data.unshift({ _id: "default", name: this.$config.COMPANY_NAME })
    state.companies = data
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