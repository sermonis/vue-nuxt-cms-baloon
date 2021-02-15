export const state = () => ({
  list: [],
  types: []
});

export const actions = {
  async fetchCustomers( store ){ 
    try {
      const { data } = await this.$axios.post('customer-service/customer/list-customer-type');
      store.commit('SET_CUSTOMERS', data.customers );
      store.commit('SET_CUSTOMER_TYPES', data.customersTypes);
    } catch (error) {
      this.$notifier.showMessage( { message : error.response?.data || error } );
    }
  },

  async addBalloon( store, form ){ 
    const { data } = await this.$axios.post('customer-service/customer/add', form );
    store.commit('ADD_CUSTOMER', data);
  },

  async editBalloon( store, form ){ 
    const { data } = await this.$axios.post('customer-service/customer/edit', form );
    store.commit('EDIT_CUSTOMER', data);
  }
}

export const mutations = {

  ADD_CUSTOMER(state, data) {
    state.list.push(data);
  },
  
  EDIT_CUSTOMER(state, data) {
    state.list.splice(state.list.findIndex(item => item._id === data._id), 1, data);
    //Object.assign(state.list[state.list.findIndex(item => item._id === data._id)], data);
  },

  SET_CUSTOMERS(state, data) {
    state.list = data;
  },

  SET_CUSTOMER_TYPES(state, data) {
    state.types = data
  }

}