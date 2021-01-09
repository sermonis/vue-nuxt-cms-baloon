export const state = () => ({
  company: "Balloon CMS",
  title: "Balloon CMS",
  fetchedData: []
});

export const mutations = {
  setData: (state, data) => {
    state.fetchedData = data;
  }
};

export const actions = {
  async get(vuexContext) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(2000);
    const requestedData = await this.$axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
  },
  
  async nuxtServerInit(store) {
    const token = this.$cookies.get('token');
    if (token) {
      try {
        const { data } = await this.$axios.post(`${this.$config.userService}/auth`, { token: token } );
        if( data.error ){
          await store.commit('auth/LOGOUT');
        } else {
          await store.commit('auth/SET_TOKEN', token);
          await store.commit('auth/SET_USER', data.user);
        }
      } catch (error) {
        await store.commit('auth/LOGOUT');
        console.log(error);
      }
    } else {
      await store.commit('auth/LOGOUT')
    }
  }

};
