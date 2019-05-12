<template>
  <v-app>
    <v-toolbar color="primary" class="white--text">
      <v-toolbar-title>
        <span class="title">MeilleursAgents PRO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip
        v-if="agency"
        :color="agency.unread_messages ? 'accent' : 'grey'"
        text-color="white"
      >
        <v-icon left dark>mail</v-icon>
        {{ agency.unread_messages }}
      </v-chip>
      <div class="vertical-divider" />
      <v-avatar v-if="agency" size="30">
        <img :src="agency.logo" alt="logo" />
      </v-avatar>
      <div v-if="agency" class="agency-name">{{ agency.name }}</div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small class="dropdown-button" flat fab v-on="on">
            <v-icon class="white--text">arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in agenciesList"
            :key="index"
            :to="`/agency/${item.id}`"
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
  mounted() {
    this.getAgencies();
  },
  data() {
    return {
      //
    };
  },
  methods: {
    ...mapActions(["getAgency", "getAgencies"])
  },
  computed: {
    ...mapGetters(["agenciesList", "agency"])
  }
};
</script>
<style lang="scss">
html {
  overflow: hidden;
}

.max-width {
  width: 100%;
}

.agency-name {
  margin: 0 3px;
}

.vertical-divider {
  width: 1px;
  height: 100%;
  background-color: white;
  margin: 0 8px;
}

.dropdown-button {
  margin: 0;
}

.v-chip .v-icon--left {
  margin-left: 0;
  border-radius: 10px;
}
@media only screen and (max-width: 600px) {
  .agency-name {
    display: none;
  }
}
@media only screen and (max-width: 959px) {
  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 0 8px;
  }
}
</style>
