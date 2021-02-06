export const state = () => ({
  token: null,
  user: null
});

export const actions = {

  checkPermission(store, permission){
    
    if( ["admin","manager"].includes(store.state.user.rank) ){
      return true;
    } else if ( store.state.user.permissions && store.state.user.permissions.includes(permission) ) {
      return true;
    }
    throw new Error('Bu sayfaya giriş izniniz yok. İzinlerinizi değiştirmek için lütfen yönetimle iletişime geçiniz')
  },

  async authUser(store, form){
    try {
      const { data } = await this.$axios.post('user-service/user/login', form);
      store.commit('SET_TOKEN', data.token);
      store.commit('SET_USER', data.user);
      return true;
    } catch (error) {
      this.$notifier.showMessage( { message : error.response.data } );
    }
  },

  logout(store){
    store.commit('LOGOUT');
    setTimeout(() => {
      this.$router.push('/login');
    }, 1500);
    
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$cookies.set('sid', state.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30
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
