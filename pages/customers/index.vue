<template>
  <v-card>
    <v-card-title>
      <v-icon color="indigo" class="mr-2">mdi-airballoon-outline</v-icon>
      Müşteriler
      <v-spacer></v-spacer>
      <v-scroll-x-reverse-transition>
        <v-text-field
          style="max-width:200px"
          v-show="searchBtn"
          v-model="search"
          label="Ara"
          single-line
          hide-details
          clearable
          dense
        ></v-text-field>

      </v-scroll-x-reverse-transition>
      <v-btn icon class="no-print" @click="searchBtn = !searchBtn">
        <v-icon color="indigo" >mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="no-print"  @click="dialog = !dialog" v-show="checkPermission('addCustomer')">
        <v-icon color="indigo" >mdi-plus-circle</v-icon>
      </v-btn>
      <v-btn icon class="no-print" @click="drawer = !drawer">
        <v-icon color="indigo">mdi-backburger</v-icon>
      </v-btn>
      
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="customerList"
      item-key="_id"
      :sort-by="['customerType.name','name']"
      :sort-desc="[true,true]"
      calculate-widths
      class="elevation-1"
      :items-per-page="25"
      :footer-props="{
          itemsPerPageOptions:[25,50,100,-1]
      }"
      dense
    >
      <!-- eslint-disable -->
      
      <!-- eslint-disable -->
    </v-data-table>
    <!--
    <Drawer :drawer.sync="drawer" :filter.sync="filter" :tableTitle="tableTitle" :data="balloonsList" />
    !-->
    <customers-dialog :defaultForm="defaultForm" :dialog.sync="dialog" :form.sync="form"/>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {

  name: "customers",

  components: {
    CustomersDialog: () => import('~/components/customers/customers-dialog'),
    //Drawer: () => import('~/components/balloons/drawer')
  },
  
  validate({ store }) {
    return store.dispatch("auth/checkPermission", "viewCustomers");
  },

  async fetch({ store }) {
    await store.dispatch("customers/fetchCustomers");
  },

  data() {
    return {
      drawer: null,
      dialog: false,
      searchBtn: false,
      search: "",
      
      headers: [
        {
          text: "Müşteri",
          value: "name",
          align: "start",
          sortable: false,
          width: "5%",
        },
        { text: "Müşteri Türü", value: "customerType.name", sortable: false, align: "center",  width: "1%" },
        { text: "Yetkili", value: "auth", sortable: false, align: "center",  width: "1%" },
        { text: "Telefon", value: "phone", sortable: false, align: "center", width: "1%" },
        { text: "Fiyat", value: "accounting.price", sortable: false, align: "center", width: "1%" },
        { text: "Tarih", value: "phone", sortable: false, align: "center", width: "1%" },
        { text: '#', value: 'actions', align: "center", sortable: false,  width: "0.01%"  },
      ],
      form: {
        _id: "default",
        name: "",
        auth: "",
        email: "",
        phone: 0,
        accounting: {
          price: 0,
          currency: 'EUR',
          dateStart: "",
          dateEnd: ""
        },
        commercial: {
          title: "",
          address: "",
          number: "",
          office: "",
        },
        customerType: { _id: "", name: "" },
        accounts: []
        
      },
      defaultForm: {
        _id: "default",
        name: "",
        auth: "",
        email: "",
        phone: 0,
        accounting: {
          price: 0,
          currency: 'EUR',
          dateStart: "",
          dateEnd: ""
        },
        commercial: {
          title: "",
          address: "",
          number: "",
          office: "",
        },
        customerType: { _id: "", name: "" },
        accounts: []
        
      },
      title: "Balonlarımız",
      filter: JSON.stringify({
          filter: {
            status: ["Aktif"]
          },
          name: "Balonlarımız"
        })
        
    };
  },
  watch:{
    filter(){
      if(! this.filter ){
        this.filter = JSON.stringify({
          filter: {
            status: ["Aktif"]
          },
          name: "Balonlarımız"
        });
      }
    }
  },
  mounted() {
    window.onbeforeprint = () => {
      this.headers.splice( this.headers.findIndex(item => item.text == "#"), 1 );
      setTimeout(() => {
        this.headers.push({ text: '#', value: 'actions', align: "center", sortable: false,  width: "0.01%"  })
      }, 1500);
    }
  },
  methods: {
    
    editItem(item){
      console.log(item);
      if( ! item.customer ) {
        item.customer = { _id: "default", name: this.$config.COMPANY_NAME }
      } 
      this.form = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    }
  },
  computed: {
    ...mapState("customers", ["list"]),

    customerList(){
      return this.list
    }
    
  }
}
</script>