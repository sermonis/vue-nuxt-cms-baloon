export const state = () => ({
  token: null,
  user: null
});

export const actions = {
  
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$cookies.set('token', state.token, {
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
    this.$cookies.remove('token');
    this.$cookies.remove('expiresIn');
  },
}

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
  getAuthKey(state) {
    return state.token
  }
};
