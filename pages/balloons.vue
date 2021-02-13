<template>
  <v-card>
    <v-card-title>
      <v-icon color="indigo" class="mr-2">mdi-airballoon-outline</v-icon>
      {{ tableTitle }}
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
      <v-btn icon class="no-print"  @click="dialog = !dialog">
        <v-icon color="indigo" >mdi-plus-circle</v-icon>
      </v-btn>
      <v-btn icon class="no-print" @click="drawer = !drawer">
        <v-icon color="indigo">mdi-backburger</v-icon>
      </v-btn>
      
    </v-card-title>
    <v-data-table
      id="balloon-table"
      :search="search"
      :headers="headers"
      :items="balloonsList"
      item-key="_id"
      :sort-by="['volume','passengerCapacity']"
      :sort-desc="[true,true]"
      calculate-widths
      class="elevation-1"
      :items-per-page="25"
      :footer-props="{
          itemsPerPageOptions:[25,50,100,-1]
      }"
      dense
    >
      <template v-slot:item.reviewCertificate="{ item }">
        {{ $itemExist(item.envelope.brand) }}
      </template>
      <template v-slot:item.reviewCertificate="{ item }">
        {{ $itemExist(item.envelope.type) }}
      </template>
      <template v-slot:item.reviewCertificate="{ item }">
        {{ dateExist(item.reviewCertificate) }}
      </template>
      <template v-slot:item.insurance="{ item }">
        {{ dateExist(item.insurance) }}
      </template>

      <template v-slot:item.volume="{ item }">
        {{ thousandFormat(item.volume) }}
      </template>
      <template v-slot:item.actions="{ item }" >
        <v-hover v-slot="{ hover }">
        <v-icon
          @click="editItem(item)"
          small
          class="mr-2 no-print"
          :color="hover ? 'primary' : ''"
        >
          mdi-pencil
        </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    <Drawer :drawer.sync="drawer" :filter.sync="filter" :tableTitle="tableTitle" :data="balloonsList" />
    <Dialog :defaultForm="defaultForm" :dialog.sync="dialog" :form.sync="form"/>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {

  name: "balloons",

  components: {
    Dialog: () => import('~/components/balloons/dialog'),
    Drawer: () => import('~/components/balloons/drawer')
    
  },
  
  validate({ store }) {
    return store.dispatch("auth/checkPermission", "viewBalloons");
  },

  async fetch({ store }) {
    await store.dispatch("balloons/fetchBalloons");
  },

  data() {
    return {
      drawer: null,
      dialog: false,
      searchBtn: false,
      search: "",
      
      headers: [
        {
          text: "Tescil",
          value: "registration",
          align: "start",
          sortable: false,
          width: "5%",
        },
        { text: "Hacim", value: "volume", sortable: false, align: "center",  width: "1%" },
        { text: "Yolcu", value: "passengerCapacity", sortable: false, align: "center", width: "1%" },
        { text: "Pilot", value: "pilotCapacity", sortable: false, align: "center",  width: "1%" },
        { text: "Marka", value: "envelope.brand", sortable: false, align: "center",  width: "5%" },
        { text: "Tip", value: "envelope.type", sortable: false, align: "center",  width: "5%" },
        { text: "Seri",value: "envelope.serial", sortable: false, align: "center",  width: "5%" },
        { text: "Uçuşa Elv.", value: "reviewCertificate", sortable: false, align: "center",  width: "1%" },
        { text: "Sigorta", value: "insurance", sortable: false, align: "center",  width: "1%" },
        { text: '#', value: 'actions', align: "center", sortable: false,  width: "0.01%"  },
      ],
      socket: null,
      form: {
        _id: "default",
        registration: "TC-B",
        volume: 1,
        pilotCapacity: 1,
        passengerCapacity: 1,
        customer: {
          _id: "default",
          name: this.$config.COMPANY_NAME,
        },
        envelope: {
          brand: '',
          type: '',
          serial: '',
          date: '',
          weight: 0,
          mtow: 0,
          mlm: 0
        },
        basket: {
          brand: '',
          type: '',
          serial: '',
          weight: 0,
          date: ''
        },
        burner: {
          brand: '',
          type: '',
          serial: '',
          weight: 0,
          date: ''
        },
        sensor: {
          brand: '',
          type: '',
          serial: '',
          ttBrand: '',
          ttType: '',
          ttSerial: '',
          tabletBrand: '',
          tabletType: '',
          tabletSerial: ''
        },
        status: "Aktif",
        reviewCertificate: "",
        insurance: "",
        cylinders: []
      },
      defaultForm: {
        _id: "default",
        registration: "TC-B",
        volume: 1,
        pilotCapacity: 1,
        passengerCapacity: 1,
        customer: {
          _id: "default",
          name: this.$config.COMPANY_NAME,
        },
        envelope: {
          brand: '',
          type: '',
          serial: '',
          date: '',
          weight: 0,
          mtow: 0,
          mlm: 0
        },
        basket: {
          brand: '',
          type: '',
          serial: '',
          weight: 0,
          date: '',
        },
        burner: {
          brand: '',
          type: '',
          serial: '',
          weight: 0,
          date: '',
        },
        sensor: {
          brand: '',
          type: '',
          serial: '',
          date: '',
          ttBrand: '',
          ttType: '',
          ttSerial: '',
          tabletBrand: '',
          tabletType: '',
          tabletSerial: ''
        },
        status: "Aktif",
        reviewCertificate: '',
        insurance: '',
        cylinders: []
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
    filter(val){
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
    this.socket = this.$nuxtSocket({
      name: "balloons",
      auth: { token: this._token },
    });

    this.socket.on("event1", (message, cb) => {
      /* Handle event */
      this.$notifier.showMessage({ message });
      console.log(message); // world
    });

    window.onbeforeprint = () => {
      this.headers.splice( this.headers.findIndex(item => item.text == "#"), 1 );
      setTimeout(() => {
        this.headers.push({ text: '#', value: 'actions', align: "center", sortable: false,  width: "0.01%"  })
      }, 1500);
    }
  },
  methods: {
    dateExist(item){
      if( ! item ){
        return '-'
      }
      return this.$formatDate(item);
    },
    thousandFormat(item) {
      return String(item).replace(/(.)(?=(\d{3})+$)/g, "$1,");
    },
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
    ...mapState("balloons", ["list"]),
    balloonsList(){
      const { filter, name } = JSON.parse(this.filter);
      this.title = name;
      return this.list.filter( (item) => {
        for (let key in filter ) {
          if (item[key]  && filter[key].includes(item[key])) {
            return true;
          }
        }
        return false;
      });
    },
    tableTitle(){
      return `Balonlar - ${this.title}`;
    }
  }
}
</script>