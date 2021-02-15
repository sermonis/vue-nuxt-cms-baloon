<template>
  <v-menu
    v-model="date"
    :close-on-content-click="false"
    transition="slide-y-transition"
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="$formatDate(getModel)"
        :label="label"
        :hint="hint || ''"
        readonly
        v-bind="attrs"
        v-on="on"
        dense
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="getModel"
      no-title
      @input="date = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props:["model","label","hint"],
  data() {
    return {
      date: false
    };
  },
  computed: {
    getModel: {
      get() {
        return this.model;
      },
      set(value) {
        this.$emit("update:model",value);
      }
    }
  }
}
</script>