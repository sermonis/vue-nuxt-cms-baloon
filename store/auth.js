export const state = () => ({
  token: "asdasda", // JWT access token
  user: {
    id: "Bearer",
    name: null,
    surname: null,
    email: null,
    lastLogin: null,
    ip: null,
    permissions: {}
  } // JWT refresh token
});

export const actions = {
  setToken(vuexContext, token) {
    vuexContext.commit("SET_TOKEN", token);
  }
};

export const mutations = {
  SET_USER(state, data) {
    state.user = data;
  },
  SET_TOKEN(state, data) {
    state.token = data;
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  },
  getAuthKey(state) {
    return state.token
  }
};
