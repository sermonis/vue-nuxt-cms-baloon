export const state = () => ({
  ip: "localhost",
  fetchedData: []
});

export const mutations = {
  setData: (state, data) => {
    state.fetchedData = data;
  },
  SET_IP:(state,data) => {
    state.ip = data;
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
  
  async nuxtServerInit(store,{req}) {
    let ip = req.connection.remoteAddress || req.socket.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7);
    }
    store.commit('SET_IP',ip);
    const token = this.$cookies.get('sid');
    if (token) {
      try {
        const { data } = await this.$axios.post('user-service/user/refresh', { token: token } );
        await store.commit('auth/SET_TOKEN', token);
        await store.commit('auth/SET_USER', data.user);
      } catch (error) {
        await store.commit('auth/LOGOUT');
        console.log(error);
      }
    } else {
      await store.commit('auth/LOGOUT')
    }
  }

};
