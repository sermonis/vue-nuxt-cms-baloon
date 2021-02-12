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
              <v-tab key="cylnders" @click="step = 5" class="white--text">Yakıt</v-tab>
              <v-tab key="sensor" @click="step = 6" class="white--text">Sensör</v-tab>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Toplam Ağırlık"
                      readonly
                      type="Number"
                      :value="totalWeight"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
            <!-- Temel Bilgiler !-->
            <!-- Kubbe Bilgileri !-->
            <v-window-item :value="2" >
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Marka"
                      hint="Marka giriniz"
                      type="text"
                      maxlength="32"
                      v-model="editedItem.envelope.brand"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Tip/Model"
                      hint="Tip/Model giriniz"
                      type="text"
                      maxlength="32"
                      v-model="editedItem.envelope.type"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Seri No"
                      hint="Seri No giriniz"
                      type="text"
                      maxlength="32"
                      v-model="editedItem.envelope.serial"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Ağırlık"
                      hint="Ağırlık giriniz"
                      type="number"
                      min="0"
                      :rules="rules.unitWeight"
                      v-model.number="editedItem.envelope.weight"
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
                      label="Üretim Tarihi"
                      hint="Üretim Tarihi giriniz"
                      type="text"
                      v-model="editedItem.envelope.date"
                      :rules="rules.unitDate"
                      v-mask="'##/####'"
                      placeholder="ay/yıl"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="MTOW"
                      hint="Maximum kalkış ağırlığı"
                      type="number"
                      min="0"
                      :rules="rules.unitWeight"
                      v-model.number="editedItem.envelope.mtow"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="MLM"
                      hint="Minimum iniş ağırlığı"
                      type="number"
                      min="0"
                      :rules="rules.unitWeight"
                      v-model.number="editedItem.envelope.mlm"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
             <!-- Kubbe Bilgileri !-->
             <!-- Sepet Bilgileri !-->
              <v-window-item :value="3" >
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Marka"
                        hint="Marka giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.basket.brand"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tip/Model"
                        hint="Tip/Model giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.basket.type"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Seri No"
                        hint="Seri No giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.basket.serial"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Ağırlık"
                        hint="Ağırlık giriniz"
                        type="number"
                        min="0"
                        :rules="rules.unitWeight"
                        v-model.number="editedItem.basket.weight"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Üretim Tarihi"
                        hint="Üretim Tarihi giriniz"
                        type="text"
                        v-model="editedItem.basket.date"
                        :rules="rules.unitDate"
                        v-mask="'##/####'"
                        placeholder="ay/yıl"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
             <!-- Sepet Bilgileri !-->
             <!-- Burner Bilgileri !-->
              <v-window-item :value="4" >
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Marka"
                        hint="Marka giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.burner.brand"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tip/Model"
                        hint="Tip/Model giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.burner.type"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Seri No"
                        hint="Seri No giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.burner.serial"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Ağırlık"
                        hint="Ağırlık giriniz"
                        type="number"
                        min="0"
                        :rules="rules.unitWeight"
                        v-model.number="editedItem.burner.weight"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Üretim Tarihi"
                        hint="Üretim Tarihi giriniz"
                        type="text"
                        v-model="editedItem.burner.date"
                        :rules="rules.unitDate"
                        v-mask="'##/####'"
                        placeholder="ay/yıl"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
              <!-- Burner Bilgileri !-->
             <!-- Yakıt Bilgileri !-->
              <v-window-item :value="5" >
                <v-container>
                  <v-row v-for="(cylinder,index) in editedItem.cylinders" :key="index">
                      <v-col cols="12" sm="6" md="2" >
                        <v-text-field
                          label="Marka"
                          hint="Marka giriniz"
                          type="text"
                          maxlength="32"
                          v-model="editedItem.cylinders[index].brand"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2"  >
                        <v-text-field
                          label="Tip/Model"
                          hint="Model giriniz"
                          type="text"
                          maxlength="32"
                          v-model="editedItem.cylinders[index].type"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="2" >
                        <v-text-field
                          label="Seri No"
                          hint="Seri no giriniz"
                          type="text"
                          maxlength="32"
                          v-model="editedItem.cylinders[index].serial"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" >
                        <v-text-field
                          label="Üretim Tarihi"
                          hint="Üretim Tarihi giriniz"
                          type="text"
                          v-model="editedItem.cylinders[index].date"
                          :rules="rules.unitDate"
                          v-mask="'##/####'"
                          placeholder="ay/yıl"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" >
                        <v-text-field
                          label="Ağırlık"
                          hint="Ağırlık giriniz"
                          type="number"
                          min="0"
                          :rules="rules.unitWeight"
                          v-model.number="editedItem.cylinders[index].weight"
                          dense
                        >
                          <v-icon slot="append-outer" color="red lighten-1" @click="deleteCylinder(index)">mdi-delete</v-icon>
                        </v-text-field>
                      </v-col>
                  </v-row>
                  <v-row class="pt-3">
                    <v-col cols="12" sm="6" md="3">
                      <v-btn text raised color="primary" @click="addCylinder" >
                          Yakıt Tankı Ekle
                          <v-icon class="ml-2">
                            mdi-plus
                          </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
             <!-- Yakıt Bilgileri !-->
             <!-- Sensor Bilgileri !-->
              <v-window-item :value="6" >
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="GPS Marka"
                        hint="Marka giriniz (Flytec vb)"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.brand"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tip/Model"
                        hint="Tip/Model giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.type"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Seri No"
                        hint="Seri No giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.serial"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Isı Ölçer Marka"
                        hint="Marka giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.ttBrand"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tip/Model"
                        hint="Tip/Model giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.ttType"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Seri No"
                        hint="Seri No giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.ttSerial"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tablet Marka"
                        hint="Marka giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.tabletBrand"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Tip/Model"
                        hint="Tip/Model giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.tabletType"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Seri No"
                        hint="Seri No giriniz"
                        type="text"
                        maxlength="32"
                        v-model="editedItem.sensor.tabletSerial"
                        dense
                      ></v-text-field>
                    </v-col>
                   
                  </v-row>
                </v-container>
              </v-window-item>
             <!-- Sensor Bilgileri !-->
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
    },

    totalWeight(){
      let cylinders = 0;
      if( this.editedItem.cylinders.length > 0 ){
        cylinders =  this.editedItem.cylinders.reduce((a, item) => {
          return a + ( /^\d+/.test(item.weight) ? item.weight : 0 )
        },0);
      }

      return ['envelope','basket','burner'].reduce( (a, item) => {
        return a + ( /^\d+/.test(this.editedItem[item].weight) ? this.editedItem[item].weight : 0 )
      }, 0 ) + cylinders;
    }
  }

}
</script>