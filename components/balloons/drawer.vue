<template>
  <v-navigation-drawer v-model="getDrawer" hide-overlay right temporary app>
    <v-list dense>
      <v-list-item-group v-model="group" multiple active-class="blue--text">
        <template v-for="(item, index) in lists">
          <v-list-item dense :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox dense :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content dense>
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-divider :key="item" />
        </template>
        <v-list-item dense @click="activateAll">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox dense :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content dense>
              <v-list-item-title>Bütün Balonlar</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      group: [],
      lists: [
        "Balonlarımız",
        "Altif Balonlar",
        "Pasif Balonlar",
        "Kiralık Balonlar"
      ]
    };
  },
  methods: {
    activateAll() {
      this.group = [0, 1, 2, 3, 4];
    }
  },
  watch: {
    group(newVal, old) {
      //this.$emit('update:drawer', ! this.drawer)
      console.log(this.group);
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
    }
  }
};
</script>
