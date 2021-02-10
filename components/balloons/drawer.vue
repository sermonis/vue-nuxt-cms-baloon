<template>
  <v-navigation-drawer v-model="getDrawer"
      hide-overlay
      right
      temporary
      app
    >
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">

        <v-list-item @click="$emit('update:drawer')">
          <v-list-item-icon>
            <v-icon>mdi-menu-right</v-icon>
          </v-list-item-icon>
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
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      group: null
    }
  },
  methods: {},
  computed: {
    getDrawer: {
      get() {
        return this.drawer;
      },
      set() {
        this.$emit("update:drawer");
      }
    }
  }
};
</script>
