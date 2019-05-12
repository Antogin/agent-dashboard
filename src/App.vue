<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>
        <span>MeilleursAgents</span>
        <span class="font-weight-light">PRO 3</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="agency" color="blue-grey" class="white--text">
        {{ agency.unread_messages }}
        <v-icon right dark>message</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">{{
            agency ? agency.name : null
          }}</v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in agenciesList"
            :key="index"
            @click="selectAgency(item.id)"
          >
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  methods: {
    ...mapActions(["selectAgency"])
  },
  computed: {
    ...mapGetters(["agenciesList", "agency"])
  }
};
</script>
