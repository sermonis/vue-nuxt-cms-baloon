<template>
  <v-dialog v-model="getDialog" max-width="600px" @click:outside="closeDialog">
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
              <v-tab key="basic" @click="step = 1" class="white--text">Temel</v-tab>
              <v-tab key="commercial" @click="step = 2" class="white--text">Ticari</v-tab>
              <v-tab key="accounting" @click="step = 3" class="white--text">Hesaplar</v-tab>
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
                      label="Müşteri Adı *"
                      hint="Müşteri Adı giriniz"
                      :clearable="!readOnly"
                      type="text"
                      maxlength="6"
                      counter="6"
                      v-model="editedItem.name"
                      :readonly="readOnly"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      label="Müşteri Türü *"
                      hint="Müşteri Türü seçiniz"
                      v-model="editedItem.customerType"
                      :items="types"
                      item-text="name"
                      item-value="_id"
                      dense
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Yetkili"
                      hint="Yetkili giriniz"
                      type="text"
                      maxlength="32"
                      v-model="editedItem.auth"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="E-mail"
                      hint="email giriniz"
                      type="text"
                      maxlength="100"
                      v-model="editedItem.email"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Adres"
                      hint="Adres giriniz"
                      type="text"
                      maxlength="150"
                      v-model="editedItem.address"
                      dense 
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Telefon"
                      hint="Telefon numarası giriniz"
                      type="text"
                      maxlength="150"
                      v-model="editedItem.address"
                      dense 
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Fiyat"
                      hint="Fiyat giriniz"
                      type="number"
                      min="1"
                      v-model.number="editedItem.accounting.price"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      label="Para Birimi *"
                      hint="Para Birimi seçiniz"
                      v-model="editedItem.accounting.currency"
                      :items="currency"
                      dense
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker :model.sync="editedItem.accounting.dateStart" :label="'Tarih Başlangıcı'" :hint="'Fiyat Başlangıç tarihini giriniz'"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <DatePicker :model.sync="editedItem.accounting.dateEnd" :label="'Tarih Bitişi'" :hint="'Fayat bitiş tarihi giriniz'"/>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-window-item>
            <!-- Temel Bilgiler !-->
            <!-- Ticari Bilgiler !-->
            <v-window-item :value="2" >
              <v-container>
                <v-row>
                  
                </v-row>
              </v-container>
            </v-window-item>
             <!-- Ticari Bilgileri !-->
             <!-- Hesap Bilgileri !-->
              <v-window-item :value="3" >
                <v-container>
                  <v-row>
                    
                  </v-row>
                </v-container>
              </v-window-item>
              <!-- Hesap Bilgileri !-->
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
import { VueMaskDirective } from 'v-mask'
export default {
  
  props: ["dialog","form","defaultForm"],
  components: {
    DatePicker: () => import('~/components/common/date-picker')
  },
  directives: {
    mask: VueMaskDirective
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
        unitDate: [
          v => v ? /^(0[1-9]|1[0-2])\/(19|20|21)\d{2}$/.test(v) || "Geçerli bir tarih giriniz" : true
        ],
        unitWeight: [
          v => v ? ( v  && `${v}`.match(/^\d+$/) && Number.isInteger(v) && v >= 0) || "Geçerli bir sayı giriniz" : true
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
      //this.$moment('20.05.2020','DD.MM.YYYY',true).isValid()
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

    addCylinder(){
      if(this.editedItem.cylinders.length < 7 ){
        const field = {
          brand: "",
          type:"",
          date:"",
          weight: 0
        };
        
        this.editedItem.cylinders.push(field);
      }
    },

    deleteCylinder(index){
      this.editedItem.cylinders.splice(index,1);
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
    ...mapState("customers", ["types"]),
    ...mapState("accounting", ["currency"]),

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
      return this.editedItem._id == "default" ? "Müşteri Ekle" : ( `Düzenle - ${this.editedItem.name || ''}` )
    },

    readOnly(){
      return this.editedItem._id.length === 24
    },

    
  }

}
</script>