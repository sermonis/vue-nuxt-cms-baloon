<template>
  <v-speed-dial
    v-show="false"
    absolute
    bottom
    right
    open-on-hover
    v-model="fab"
    class="no-print"
  >
    <template v-slot:activator>
      <v-btn :color="fab ? 'red darken-2' : 'blue darken-2'" dark fab>
        <v-icon v-show="fab"> mdi-close </v-icon>
        <v-icon v-show="!fab"> mdi-share-variant </v-icon>
      </v-btn>
    </template>

    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab dark small color="green" v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Kalem</span>
    </v-tooltip>

    <v-btn fab dark small color="indigo">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>
<script>
export default {
  data() {
    return {
      fab: false,
    }
  }
}
</script>
