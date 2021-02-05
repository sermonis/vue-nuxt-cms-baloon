<template>
  <v-card>
    <v-card-title>
      <v-icon color="indigo" class="mr-2">mdi-airballoon-outline</v-icon>
      {{ headerText }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Ara"
        single-line
        hide-details
        clearable
        dense
      ></v-text-field>
      
    </v-card-title>
    <v-data-table
      id="balloon-table"
      :search="search"
      :headers="headers"
      :items="list"
      item-key="_id"
      :sort-by="['volume', 'passengerCapacity']"
      :sort-desc="[true, true]"
      calculate-widths
      class="elevation-1"
      :items-per-page="5"
      dense
    >
    <template v-slot:item.reviewCertificate="{ item }">
      {{ item.reviewCertificate || '-' }}
    </template>
    <template v-slot:item.insurance="{ item }">
      {{ item.insurance || '-' }}
    </template>
    
    <template v-slot:item.volume="{ item }">
      {{ thousandFormat(item.volume) }}
    </template>
    
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "balloons",
  validate({ store }){
    return store.dispatch('auth/checkPermission', 'viewBalloons')
  },
  
  async fetch( { store } ){
    await store.dispatch('balloons/fetchBalloons');
  },
  data(){
    return {
      headerText: "Balonlar", 
      search: '',
      
      headers: [
        {
          text: 'Tescil',
          align: 'start',
          sortable: false,
          value: 'registration',
        },
        { text: 'Hacim', align: 'start', value: 'volume' },
        { text: 'Yolcu', align: 'start', value: 'passengerCapacity' },
        { text: 'Pilot', align: 'start', value: 'pilotCapacity' },
        { text: 'Marka', align: 'start', value: 'envelope.brand' },
        { text: 'Tip', align: 'start', value: 'envelope.type' },
        { text: 'Seri', align: 'start', value: 'envelope.serial' },
        { text: 'Uçuşa Elv.', align: 'start', value: 'reviewCertificate' },
        { text: 'Sigorta', align: 'start', value: 'insurance' },
      ],
      socket: null
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'balloons',
      auth: { token: this._token }
    });
   
    this.socket.on('event1', (message, cb) => {
      /* Handle event */
      this.$notifier.showMessage({message})
      console.log(message); // world
    });
  },
  methods: {
    thousandFormat( item ) {
      return String(item).replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }
  },
  computed: {
    ...mapState("balloons", ["list"])
  },
  
  
}
</script>
