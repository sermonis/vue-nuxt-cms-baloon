<template>
<div>
  <v-card>
    <v-card-title>
      <v-icon color="indigo" class="mr-2">mdi-airballoon-outline</v-icon>
      {{ headerText }}
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
      :sort-by="['customer.name','volume','passengerCapacity']"
      :sort-desc="[true,true,true]"
      calculate-widths
      class="elevation-1"
      :items-per-page="25"
      :footer-props="{
          itemsPerPageOptions:[25,50,100,-1]
      }"
      dense
    >
      <template v-slot:item.reviewCertificate="{ item }">
        {{ $itemExist(item.reviewCertificate) }}
      </template>
      <template v-slot:item.insurance="{ item }">
        {{ $itemExist(item.insurance) }}
      </template>

      <template v-slot:item.volume="{ item }">
        {{ thousandFormat(item.volume) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-hover v-slot="{ hover }">
        <v-icon
          small
          class="mr-2 no-print"
          :color="hover ? 'primary' : ''"
        >
          mdi-pencil
        </v-icon>
        </v-hover>
      </template>
    </v-data-table>
    
  </v-card>
  
    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
      hide-overlay
      
    >
    <v-list nav dense  >
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
        
      >
        <v-list-item @click="drawer = !drawer" >
          <v-list-item-icon>
            <v-icon >mdi-menu-right</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Foo</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Bar</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Fizz</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Buzz</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialog" max-width="600px" >
    <v-form
      @keyup.native.enter="valideForm"
      autocomplete="off"
      ref="form"
      v-model="validForm"
      lazy-validation
    >
      <v-card>
        <v-toolbar color="primary" dense dark height="30px" extension-height="24px">
          {{ formTitle }}
          <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
          fixed-tabs
          height="24px"
        >
          <v-tab
            
            v-for="n in 3"
            :key="n"
            class="white--text"
          >
            Item {{ n }}
          </v-tab>
        </v-tabs>
      </template>
        </v-toolbar>
        <v-card-text>
          
          <v-container>
            <v-row  >
              <v-col cols="12" sm="6" md="4" >
                <v-text-field 
                  autofocus
                  label="Tescil"
                  hint="Tescil işaretini giriniz"
                  clearable
                  v-model="editedItem.registration"
                  :rules="rules.registration"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" >
                <v-text-field 
                  label="Hacim"
                  hint="Balon Hacmini giriniz"
                  type="Number"
                  v-model.number="editedItem.volume"
                  :rules="rules.volume"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Yolcu Kapasitesi"
                  hint="Yolcu Kapasitesini giriniz"
                  type="Number"
                  v-model.number="editedItem.passengerCapacity"
                  :rules="rules.volume"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Pilot Kapasitesi"
                  hint="Pilot Kapasitesini giriniz"
                  type="Number"
                  v-model.number="editedItem.pilotCapacity"
                  :rules="rules.volume"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  label="İşletici Firma"
                  hint="Kralıksa balon firmasını seçiniz"
                  v-model="editedItem.customer"
                  :items="companies"
                  item-text="name"
                  item-value="_id"
                  :rules="rules.customer"
                  dense
                >
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            icon
            @click="$refs.form.reset()"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            
            text
            @click="dialog = false"
          >
            Vazgeç
          </v-btn>
          <v-btn
            color="primary"
            text
            :loading="loading"
            @click="valideForm"
          >
            Kaydet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</div>
  
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "balloons",
  validate({ store }) {
    return store.dispatch("auth/checkPermission", "viewBalloons");
  },

  async fetch({ store }) {
    await store.dispatch("balloons/fetchBalloons");
  },
  data() {
    return {
      rules: {
        registration: [
          v => !!v || "Tescil işaretini giriniz",
          v => v && v.substr(0, 4) === "TC-B" || "Geçerli bir tescil giriniz",
          v => v && v.length == 6 || "Geçerli bir tescil giriniz"
        ],
        volume: [
          v => !!v || "Bu kısım gereklidir",
          v => v && /^\d+$/.test(v) && Number.isInteger(v) && v > 0  || "Geçerli bir sayı giriniz"
        ],
        insurance: [
          v => v ? /^\d+$/.test(v) && Number.isInteger(v) && v > 1  || "Geçerli bir hacim giriniz" : true
        ],
        customer: [
          v => !!v || "Lütfen firma seçiniz",
        ]
      },
      tabs: null,
      drawer: null,
      validForm: false,
      loading: false,
      editedIndex: -1,
      editedItem: {
        _id: "default",
        registration: '',
        volume: '',
        pilotCapacity: 1,
        passengerCapacity: 1,
        customer: {
          _id: "default",
          name: this.$config.COMPANY_NAME
        },
        insurance: ''
      },
      group: null,
      dialog: false,
      searchBtn: false,
      headerText: "Balonlar",
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
        { text: "Uçuşa Elv.", value: "reviewCertificate", sortable: false, align: "center",  width: "5%" },
        { text: "Sigorta", value: "insurance", sortable: false, align: "center",  width: "5%" },
        { text: '#', value: 'actions', align: "center", sortable: false,  width: "0.01%"  },
      ],
      socket: null,
    };
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
  },
  methods: {
    thousandFormat(item) {
      return String(item).replace(/(.)(?=(\d{3})+$)/g, "$1,");
    },
    async valideForm(){
      this.loading = true; setTimeout(() => { this.loading = false; }, 2000);
      if( this.$refs.form.validate() ){
        console.log(this.editedItem);
        await this.$store.dispatch('balloons/addBalloons', this.editedItem );
        this.dialog = false;
        this.$refs.form.reset();
      }
    }
  },
  computed: {
    ...mapState("balloons", ["list","companies"]),
    formTitle () {
      return this.editedIndex === -1 ? 'Balon Ekle' : `Düzenle - ${this.editedItem.registration}`;
    },
    balloonsList(){
      return this.list.filter(item => item.status == "Aktif");;
    }
    
  }
}
</script>