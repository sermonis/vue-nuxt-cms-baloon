<template>
  <v-navigation-drawer v-model="getDrawer" hide-overlay right temporary app>
    <v-list dense flat>
      <v-subheader>
        <v-icon color="orange" small v-text="`mdi-filter-menu`" class="mr-2" />
        Filtreler
      </v-subheader>
      <v-list-item-group v-model="group" color="primary" >
        <template v-for="(item, index) in lists">
          <v-list-item :key="index" :value="JSON.stringify(item)">
              
              <v-list-item-icon>
                <v-icon v-text="group == JSON.stringify(item) ? 'mdi-playlist-check' : 'mdi-format-list-bulleted'"/>
              </v-list-item-icon>

              <v-list-item-content >
                <v-list-item-title v-text="item.name"/>
              </v-list-item-content>
            
          </v-list-item>
          <v-divider :key="item.name" />
        </template>
      </v-list-item-group>
      <v-subheader>
        <v-icon color="orange" small v-text="`mdi-cloud-upload`" class="mr-2" />
        Dışa Aktar
      </v-subheader>
      <v-list-item-group v-model="exportTable" color="primary" >
       
          <v-list-item >
              
              <v-list-item-icon>
                <v-icon color="success" v-text="'mdi-microsoft-excel'"/>
              </v-list-item-icon>

              <v-list-item-content >
                <v-list-item-title >
                  <ExportExcel :data="data" :fields="fields" :name="tableTitle" :title="tableTitle" :header="tableTitle" :worksheet="tableTitle" />
                </v-list-item-title>
              </v-list-item-content>
            
          </v-list-item>
          <v-divider :key="tableTitle" />
        
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer","filter","data","tableTitle"],
  components: {
    ExportExcel: () => import('~/components/data-table/export-excel')
  },
  data() {
    return {
      exportTable: [],
      lists: [
        {
          filter: {
            status: ["Aktif"]
          },
          name: "Balonlarımız"
        },
        {
          filter: {
            status: ["Aktif"]
          },
          name: "Aktif Balonlar"
        },
        {
          filter: {
            status: ["Pasif"]
          },
          name: "Pasif Balonlar"
        },
        {
          filter: {
            status: ["Aktif"]
          },
          name: "Kiralık Balonlar"
        },
        {
          filter: {
            status: ["Aktif","Pasif"]
          },
          name: "Bütün Balonlar"
        }
      ],
      fields: {
        Tescil: "registration",
        Hacim: "volume",
        Yolcu: "passengerCapacity",
        Pilot: "pilotCapacity",
        "Marka": {
          field: "envelope.brand",
          callback: (value) => {
            return value || '-';
          },
        },
        "Tip": {
          field: "envelope.brand",
          callback: (value) => {
            return value || '-';
          },
        },
        "Seri": {
          field: "envelope.serial",
          callback: (value) => {
            return value || '-';
          },
        },
        "Uçuşa Elv.": {
          field: "reviewCertificate",
          callback: (value) => {
            return value ? this.$moment(value).format('DD.MM.YYYY') : '-';
          },
        },
        "Sigorta": {
          field: "insurance",
          callback: (value) => {
            return value ? this.$moment(value).format('DD.MM.YYYY') : '-';
          },
        },
      }
    };
  },
  methods: {
    checkValue(value) {
      console.log(value);
    }
  },
  computed: {
    getDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update:drawer", value);
      }
    },
    group: {
      get() {
        return this.filter;
      },
      set(value) {
        this.$emit("update:filter", value);
      }
    }
  }
};
</script>
