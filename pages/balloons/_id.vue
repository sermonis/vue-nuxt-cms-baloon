
<template>
  <v-card>
    <v-card-title class="no-print">
      <v-btn raised icon @click="$router.push('/balloons')">
        <v-icon color="indigo" v-text="'mdi-arrow-left'"/>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-simple-table dense v-if="balloon">
      <tbody>
        <tr class="tdheight">
          <td class="font-bolder border-top">Tescil</td>
          <td class="font-bolder registration-font-size border-top">{{ balloon.registration }}</td>
          <td class="font-bolder border-top">Üretim Tarihi</td>
          <td class="border-top">{{ $itemExist(balloon.envelope.date) }}</td>
          <td class="font-bolder border-top">Toplam Ağırlık</td>
          <td class="border-top border-right">{{ totalWeight }} Kg</td>
        </tr>
        <tr class="tdheight">
          <td class="font-bolder">Kapasite</td>
          <td>{{ balloon.passengerCapacity }}</td>
          <td class="font-bolder">İşletmeci firma</td>
          <td>{{ balloon.customer ? balloon.customer.name : $config.COMPANY_NAME }}</td>
          <td class="font-bolder">MTOW</td>
          <td class="border-right">{{ weight(balloon.envelope.mtow) }}</td>
        </tr>
        <tr class="tdheight">
          <td class="font-bolder">Uçuşa Elverişlilik</td>
          <td>{{ dateExist(balloon.reviewCertificate) }}</td>
          <td class="font-bolder">Sigorta Geçerlilik</td>
          <td>{{ dateExist(balloon.insurance) }}</td>
          <td class="font-bolder">MLM</td>
          <td class="border-right">{{ weight(balloon.envelope.mlm) }}</td>
        </tr>
        <tr class="vendorListHeading">
          <td>Unite</td>
          <td>Marka</td>
          <td>Tip/Model</td>
          <td>SeriNo</td>
          <td>Üretim Tarihi</td>
          <td class="border-right">Ağırlık</td>
        </tr>
        <tr>
          <td>KUBBE</td>
          <td>{{ $itemExist(balloon.envelope.brand) }}</td>
          <td>{{ $itemExist(balloon.envelope.type) }}</td>
          <td>{{ $itemExist(balloon.envelope.serial) }}</td>
          <td>{{ $itemExist(balloon.envelope.date) }}</td>
          <td class="border-right">{{ weight(balloon.envelope.weight) }}</td>
        </tr>
        <tr>
          <td>SEPET</td>
          <td>{{ $itemExist(balloon.basket.brand) }}</td>
          <td>{{ $itemExist(balloon.basket.type) }}</td>
          <td>{{ $itemExist(balloon.basket.serial) }}</td>
          <td>{{ $itemExist(balloon.basket.date) }}</td>
          <td class="border-right">{{ weight(balloon.basket.weight) }}</td>
        </tr>
        <tr>
          <td>BURNER</td>
          <td>{{ $itemExist(balloon.burner.brand) }}</td>
          <td>{{ $itemExist(balloon.burner.type) }}</td>
          <td>{{ $itemExist(balloon.burner.serial) }}</td>
          <td>{{ $itemExist(balloon.burner.date) }}</td>
          <td class="border-right">{{ weight(balloon.burner.weight) }}</td>
        </tr>
        <tr v-for="(cylinder,index) in balloon.cylinders" :key="index">
          <td>YAKIT TANKI</td>
          <td>{{ $itemExist(cylinder.brand) }}</td>
          <td>{{ $itemExist(cylinder.type) }}</td>
          <td>{{ $itemExist(cylinder.serial) }}</td>
          <td>{{ $itemExist(cylinder.date) }}</td>
          <td class="border-right">{{ weight(cylinder.weight) }}</td>
        </tr>
        <tr>
          <td>SENSOR</td>
          <td>{{ $itemExist(balloon.sensor.brand) }}</td>
          <td>{{ $itemExist(balloon.sensor.type) }}</td>
          <td>{{ $itemExist(balloon.sensor.serial) }}</td>
          <td>-</td>
          <td class="border-right">-</td>
        </tr>
      </tbody>
  </v-simple-table>
    <v-alert
      v-else
      border="left"
      colored-border
      type="info"
      color="indigo"
      elevation="2"
    >
      Balon bilgilerine ulaşılamadı. Lütfen balonlar sayfasına girerek ilgili balona tıklayıp bu sayfaya ulaşınız
    </v-alert>
  </v-card>
</template>

<script>

export default {

  name: "balloonId",
  validate({ store, params }) {
    if ( params.hasOwnProperty("id") && /^(0x|0h)?([0-9A-F]{24})+$/i.test(params.id) ) {
      return store.dispatch("auth/checkPermission", "viewBalloons");
    }
    return false;
  },
  data() {
    return { 
      balloon : null
    }
  },
  methods: {
    fetchBalloon(){
      this.balloon = this.$store.state.balloons.list.find(item => item._id === this.$route.params.id );
    },
    dateExist(item){
      if( ! item ){
        return '-'
      }
      return this.$formatDate(item);
    },
    weight(weight){
      return weight ? `${weight} kg` : '-';
    }
  },
  computed: {
    totalWeight(){
      if( this.balloon ){
        let cylinders = 0;
        if( this.balloon.cylinders.length > 0 ){
          cylinders =  this.balloon.cylinders.reduce((a, item) => {
            return a + ( /^\d+/.test(item.weight) ? item.weight : 0 )
          },0);
        }

        return ['envelope','basket','burner'].reduce( (a, item) => {
          return a + ( /^\d+/.test(this.balloon[item].weight) ? this.balloon[item].weight : 0 )
        }, 0 ) + cylinders;
      }
      return 0;
    }
  },
  created() {
    this.fetchBalloon()
  }
}
</script>
<style scoped>
  .v-data-table >table, table td {
    border: 1px solid black !important;
    border-width: 0 0 1px 1px !important;
    -webkit-print-color-adjust: exact;
  }
  .v-data-table >table {
    border-width: 1px 1px 0 0 !important;
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    -webkit-print-color-adjust: exact;
  }

  .border-top {
    border-top: 1px solid black !important;
    -webkit-print-color-adjust: exact;
  }
  .border-right {
    border-right: 1px solid black !important;
    -webkit-print-color-adjust: exact;
  }
  
  .vendorListHeading td {
    background-color: #e1e1e1 !important;
    font-weight:bold;
    -webkit-print-color-adjust: exact;
  }

  .tdheight {
    height: 40px !important;
    -webkit-print-color-adjust: exact;
  }

  .font-bolder{
    font-weight:bold  !important;
    -webkit-print-color-adjust: exact;
  }

  .registration-font-size{
    font-size: 20px !important;
    -webkit-print-color-adjust: exact;
  }

</style>
