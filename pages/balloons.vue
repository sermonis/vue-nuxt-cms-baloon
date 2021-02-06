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
      <v-btn class="no-print" icon @click="searchBtn = !searchBtn">
        <v-icon :color="searchBtn ? 'primary' : ''" >mdi-magnify</v-icon>
      </v-btn>
      <v-btn class="no-print" icon @click="drawer = !drawer">
        <v-icon :color="drawer ? 'primary' : ''" >mdi-backburger</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      id="balloon-table"
      :search="search"
      :headers="headers"
      :items="list"
      item-key="_id"
      :sort-by="['volume']"
      :sort-desc="[true]"
      calculate-widths
      class="elevation-1"
      :items-per-page="5"
      dense
    >
      <template v-slot:item.reviewCertificate="{ item }">
        {{ $itemExist(item.reviewCertificate) }}
      </template>
      <template v-slot:item.insurance="{ item }">
        {{ $itemExist(item.insurance) }}
      </template>

      <template slot="item.volume" slot-scope="{ item }" >
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
        <v-list-item>
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
      drawer: null,
      group: null,
      searchBtn: false,
      solo: false,
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
        { text: "Yolcu", value: "passengerCapacity", sortable: false, align: "center", width: "2%" },
        { text: "Pilot", value: "pilotCapacity", sortable: false, align: "center",  width: "2%" },
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
  },
  computed: {
    ...mapState("balloons", ["list"]),
  }
}
</script>
