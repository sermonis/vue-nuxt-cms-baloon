export const state = () => ({
  token: null,
  user: null
});

export const actions = {
  async authUser(vuexContext, form){
    try {
      const { data } = await this.$axios.post('user-service/login', form);
      vuexContext.commit('SET_TOKEN', data.token);
      vuexContext.commit('SET_USER', data.user);
      return true;
    } catch (error) {
      this.$notifier.showMessage( error.response.data )
      console.log(error.response);
    }
  }
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$cookies.set('sid', state.token, {
      path: '/',
      maxAge: 60 * 60 * 24
    });
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

export const getters = {
  isAuthenticated(state) {
    return state.token != null && state.user != null
  },
  getAuthKey(state) {
    return state.token
  }
};
