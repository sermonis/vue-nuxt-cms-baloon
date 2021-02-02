<template>
  <v-snackbar v-model="show" timeout="3000" >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn fab small text v-bind="attrs" @click="show = false">
        <v-icon :color="color"> {{ icon }} </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
      icon: ""
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        //this.message = this.$t(state.snackbar.content, state.snackbar.args) || state.snackbar.content;
        this.message = state.snackbar.content;
        this.icon = state.snackbar.color ? "mdi-checkbox-marked-circle": "mdi-alert-circle-outline";
        this.color = state.snackbar.color ? "success" : "red";
        this.show = true;
      }
    });
  }
}
</script>
