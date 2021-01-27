<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      
    >
    <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            v-on="on"
            elevation="2"
            class="mr-1"
          >
            <v-avatar
              size="28"
            >
              <img
                src="https://scontent.fasr1-2.fna.fbcdn.net/v/t31.0-8/13920368_10154293188232088_7401713779660045502_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=KZt9PmEeUcwAX9pTpZt&_nc_ht=scontent.fasr1-2.fna&oh=f443913d7997518e6cfedd2b9072e0e1&oe=602AF886"
                alt=""
              >
            </v-avatar>
          </v-btn>
        </template>
      

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://scontent.fasr1-2.fna.fbcdn.net/v/t31.0-8/13920368_10154293188232088_7401713779660045502_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=KZt9PmEeUcwAX9pTpZt&_nc_ht=scontent.fasr1-2.fna&oh=f443913d7997518e6cfedd2b9072e0e1&oe=602AF886"
                alt=""
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ `${$store.state.auth.user.name } ${$store.state.auth.user.surname }` }}</v-list-item-title>
              <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="fav ? 'red--text' : ''"
                icon
                @click="fav = !fav"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="message"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="hints"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="blue-grey"
            class="ma-2 white--text"
            @click="logOut"
          >
            {{ $t('login.logOut') }}
            <v-icon
              right
              dark
            >
              mdi-logout
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
  export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      loader: null,
      loading3: false
    }),
    methods: {
      logOut() {
        this.loader = 'loading3';
        this.$logout();
      }
    },
    watch: {
      loader () {
        const l = this.loader;
        this[l] = !this[l];

        setTimeout(() => (this[l] = false), 3000);

        this.loader = null;
      },
    },
  }
</script>

<style lang="scss" scoped></style>