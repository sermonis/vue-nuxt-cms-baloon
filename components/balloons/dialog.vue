<template>
  <v-dialog v-model="getDialog" max-width="700px" @click:outside="closeDialog">
    <v-form
      @keyup.native.enter="valideForm"
      autocomplete="off"
      ref="form"
      v-model="validForm"
      lazy-validation
    >
      <v-card>
        <v-toolbar color="primary" dense dark height="30px" extension-height="24px">
          <v-spacer/>
          {{ dialogTitle }}
          <v-spacer/>
          <v-btn  small icon dark @click="closeDialog" >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-tabs v-model="tabs" center-active fixed-tabs show-arrows height="24px">
              <v-tab key="main" @click="step = 1" class="white--text">Temel</v-tab>
              <v-tab key="envelope" @click="step = 2" class="white--text">Kubbe</v-tab>
              <v-tab key="basket" @click="step = 3" class="white--text">Sepet</v-tab>
              <v-tab key="burner" @click="step = 4" class="white--text">Burner</v-tab>
              <v-tab key="cylders" @click="step = 5" class="white--text">Yakıt</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-card-text>
          <v-window v-model="step">
            <!-- Temel Bilgiler !-->
            <v-window-item :value="1">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      autofocus
                      label="Tescil *"
                      hint="Tescil işaretini giriniz"
                      :clearable="!readOnly"
                      type="text"
                      maxlength="6"
                      counter="6"
                      v-model="editedItem.registration"
                      :rules="rules.registration"
                      :readonly="readOnly"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Hacim *"
                      hint="Balon Hacmini giriniz"
                      type="Number"
                      min="1"
                      v-model.number="editedItem.volume"
                      :rules="rules.volume"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Yolcu Kapasitesi *"
                      hint="Yolcu Kapasitesini giriniz"
                      type="Number"
                      min="1"
                      v-model.number="editedItem.passengerCapacity"
                      :rules="rules.volume"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Pilot Kapasitesi *"
                      hint="Pilot Kapasitesini giriniz"
                      type="Number"
                      min="1"
                      v-model.number="editedItem.pilotCapacity"
                      :rules="rules.volume"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      label="İşletici Firma *"
                      hint="Kralıksa balon firmasını seçiniz"
                      v-model="editedItem.customer"
                      :items="companies"
                      item-text="name"
                      :rules="rules.customer"
                      dense
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      label="Durum *"
                      v-model="editedItem.status"
                      :items="['Aktif','Pasif']"
                      :rules="rules.status"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker :model.sync="editedItem.insurance" :label="'Sigorta'" :hint="'Sigorta geçerlilik tarihi'"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker :model.sync="editedItem.reviewCertificate" :label="'Uçuşa Elverişlilik'" :hint="'Uçuşa Elverişlilik tarihi'"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
            <!-- Temel Bilgiler !-->
            <!-- Ünite Bilgileri !-->
            <v-window-item :value="2" >
              <v-container>
                <v-row>
                  
                </v-row>
              </v-container>
            </v-window-item>
             <!-- Ünite Bilgileri !-->
              <v-window-item :value="3" ><v-container><v-row>yakit Bilgileri</v-row></v-container></v-window-item>
          </v-window>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" icon @click="resetForm">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn color="primary" text @click="closeDialog"> Vazgeç </v-btn>
          <v-btn color="primary" text :loading="loading" @click="valideForm">
            Kaydet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  
  props: ["dialog","form","defaultForm"],
  components: {
    DatePicker: () => import('~/components/common/date-picker')
  },
  data() {
    return {
      datePickers:{
        insurance: false,
        reviewCertificate: false
      },
      rules: {
        registration: [
          v => v && /^(TC-B)([A-Z]{2})+$/.test( v ) || "Geçerli bir tescil giriniz"
        ],
        volume: [
          v => !!v || "Bu kısım gereklidir",
          v => (v && /^\d+$/.test(v) && Number.isInteger(v) && v > 0) || "Geçerli bir sayı giriniz",
        ],
        insurance: [
          v => v ? (/^\d+$/.test(v) && Number.isInteger(v) && v > 1) || "Geçerli bir hacim giriniz" : true
        ],
        customer: [
          v => !!v || "Lütfen firma seçiniz"
        ],
        status: [
          v => v && ["Aktif","Pasif"].includes(v) || "Lütfen durum seçiniz"
        ]
      },
      tabs: null,
      step: 1,
      validForm: false,
      loading: false
      
    }
  },
  methods: {
    async valideForm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
        console.log(this.editedItem);
      if (this.$refs.form.validate()) {
        try {
          if( this.editedItem._id == 'default' ){
            await this.$store.dispatch("balloons/addBalloon", this.editedItem);
          } else {
            await this.$store.dispatch("balloons/editBalloon", this.editedItem);
          }
          this.closeDialog();
        } catch (error) {
          this.$notifier.showMessage( { message : error.response?.data || error } );
        }
      }
      
    },
    resetForm() {
      if( this.editedItem._id == 'default' ){
        this.$refs.form.reset();
      } else {
        this.$refs.form.resetValidation();
      }
    },
    closeDialog(){
      this.step = 1;
      this.tabs = null;
      this.resetForm();
      this.$emit('update:dialog');
      this.$nextTick(() => {
        this.$emit('update:form',this.defaultForm);
      })
    }
  },
  computed: {
    ...mapState("balloons", ["companies"]),
    getDialog: {
      get() {
        return this.dialog;
      },
      set() {
        this.$emit("update:dialog");
      }
    },
    editedItem: {
      get() {
        return this.form;
      },
      set(value){
        this.$emit('update:form',value);
      }
    },
    dialogTitle() {
      return this.editedItem._id == "default" ? "Balon Ekle" : ( `Düzenle - ${this.editedItem.registration || ''}` )
    },
    readOnly(){
      return this.editedItem._id.length === 24
    }
  }
}
</script>