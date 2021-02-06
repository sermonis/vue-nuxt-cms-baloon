<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app >

      <NavList/>

    </v-navigation-drawer>
    
    <v-app-bar app dense elevation="1" class="no-print">
      <v-app-bar-nav-icon color="black" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <nuxt-link to="/">
        <v-img
          class="mx-2"
          src="/images/logo.png"
          max-height="40"
          max-width="40"
          contain
        />
      </nuxt-link>
      <v-spacer/>
      <v-toolbar-title>{{ $config.COMPANY_NAME }}</v-toolbar-title>

      <v-spacer/>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      
      <UserMenu v-if="_loggedIn"/>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <Snackbar />
    <Footer class="no-print"/>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "default-layout",
  middleware: "auth",
  components: {
    //ScroolToTop: () => import("~/components/common/scrool-to-top.vue"),
    Snackbar: () => import('~/components/common/snack-bar'),
    UserMenu: () => import('~/components/common/user-menu'),
    Footer: () => import('~/components/common/footer'),
    NavList: () => import('~/components/common/nav-list.vue')
  },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    data() {

    }
  }
}
</script>
<style>
  .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td,
  .v-data-table--dense > .v-data-table__wrapper > table > thead > tr > td,
  .v-data-table--dense > .v-data-table__wrapper > table > tfoot > tr > td {
    height: 24px !important;
    padding: 0 0 0 3px !important;
  }
  .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > th,
  .v-data-table--dense > .v-data-table__wrapper > table > thead > tr > th,
  .v-data-table--dense > .v-data-table__wrapper > table > tfoot > tr > th {
    height: 24px !important;
  }

  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td,

.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td{
  padding: 0 3px 0  3px !important;
  transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

  @media print {
   
    .no-print, .no-print *
    {
      display: none !important;
    }
    .v-data-footer, .v-input {
      display: none !important;
    }
    .container {
      padding-top: -50px;
      margin-top: -50px;
      top:0;
      box-shadow: none !important;
      border: 0;
      border-radius: 0;
    }
    .v-application .elevation-1 {
      box-shadow: none !important;
    }
    .v-data-table, .v-card, .v-sheet, .elevation-1{
      padding: 0;
      margin: 0;
      box-shadow: none !important;
      border: 0 !important;
      color: #000000 !important;
    }
    
    .v-data-table-header th {
        color: #000000 !important;
    }
    .v-data-table tbody tr, .v-data-table tbody td, .v-data-table-header tr, .v-data-table-header th {
            border-bottom: 1px solid black  !important;
    }
    .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td,
    .v-data-table--dense > .v-data-table__wrapper > table > thead > tr > td,
    .v-data-table--dense > .v-data-table__wrapper > table > tfoot > tr > td {
      height: 20px  !important;
    }
    .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > th,
    .v-data-table--dense > .v-data-table__wrapper > table > thead > tr > th,
    .v-data-table--dense > .v-data-table__wrapper > table > tfoot > tr > th {
      height: 20px  !important;
    }
  }
</style>