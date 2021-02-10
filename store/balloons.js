export const state = () => ({
  list: [],
  companies: [],
  form: {}
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

  async addBalloon( store, form ){ 
    const { data } = await this.$axios.post('balloon-service/balloon/add', form );
    store.commit('ADD_BALLOON', data);
  },

  async editBalloon( store, form ){ 
    const { data } = await this.$axios.post('balloon-service/balloon/edit', form );
    store.commit('EDIT_BALLOON', data);
  }
}

export const mutations = {

  ADD_BALLOON(state, data) {
    state.list.push(data);
  },
  
  EDIT_BALLOON(state, data) {
    //state.list[state.list.findIndex(item => item._id === data._id)] = {...data}
    Object.assign(state.list[state.list.findIndex(item => item._id === data._id)], data);
  },

  SET_BALLOONS(state, data) {
    state.list = data;
  },

  SET_COMPANIES(state, data) {
    data.unshift({ _id: "default", name: this.$config.COMPANY_NAME })
    state.companies = data
  }

}