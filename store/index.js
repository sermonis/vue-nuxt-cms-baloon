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
  nuxtServerInit(vuexContext, context ) {
    /*return context.$axios
      .post("http://localhost:4000/", { some: "data" })
      .then(response => {
        //vuexContext.commit('auth/SET_TOKEN','newToken', { root: true })
        
        
      });
      */
  },

  setAuth(vuexContent){
    //vuexContent.dispatch('auth/setToken',"newToken", { root: true })
  }

};
