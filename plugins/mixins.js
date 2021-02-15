import Vue from "vue";

Vue.mixin({
  computed: {
    _user() {
      return this.$store.state.auth.user;
    },
    _token() {
      return this.$store.state.auth.token;
    },
    _loggedIn() {
      return this._user && this._token;
    }
  },
  methods: {
    async $logout() {
      await this.$store.commit("auth/LOGOUT");
      this.$router.push("/login");
    },

    $itemExist(item){
      return item || "-" 
    },

    $formatDate(date, format = 'DD.MM.YYYY'){
      if(! date ) return null;
      return this.$moment(date).format(format)
    },

    checkPermission(permission) {
      if (!this._loggedIn) {
        return false;
      }
      if (["admin", "manager"].includes(this._user.rank)) {
        return true;
      } else if ( this._user.permissions && this._user.permissions.includes(permission) ) {
        return true;
      } else {
        return false;
      }
    }
  }
});
