export const state = () => ({
  list: []
});

export const mutations = {
  SET_LIST(state, data) {
    state.list = data;
  }
};

export const actions = {
  async getPhotos(vuexContext, context) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1500);
    const requestedData = await this.$axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    vuexContext.commit('SET_LIST', requestedData.data);
    return requestedData;
    
  }
};
