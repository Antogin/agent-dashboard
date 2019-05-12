<template>
  <v-layout row :class="$route.params.messageId ? 'show-message': null">
    <v-flex class="message-list" xs12 sm4>
      <v-card>
        <v-list two-line>
          <template v-for="(message, index) in messages">
            <v-list-tile
              :key="message.id"
              avatar
              ripple
              :to="`/agency/${$route.params.agencyId}/message/${message.id}`"
            >
              <v-list-tile-action>
                <v-icon>{{message.type}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ message.contact | formatContact(message.type) }}</v-list-tile-title>
                <v-list-tile-title>{{ message.body }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ message.subject }}</v-list-tile-sub-title>
                <!-- <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title> -->
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ message.date | formatDate }}</v-list-tile-action-text>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < messages.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <div class="pa-5 message-view">
      <router-view/>
    </div>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as moment from "moment";

export default {
  mounted() {
    const { agencyId } = this.$route.params;
    this.getAgency(agencyId);
    this.getMessages(agencyId);
  },
  data() {
    return {
      selected: [2]
    };
  },
  methods: {
    ...mapActions(["getAgency", "getMessages"])
  },
  computed: {
    ...mapGetters(["messages"])
  },
  watch: {
    "$route.params.agencyId": function(agencyId) {
      this.getAgency(agencyId);
    }
  },
  filters: {
    formatContact: function(contact, type) {
      if (type === "email") {
        if (contact.firstname && contact.lastname) {
          return `${contact.firstname} ${contact.lastname}`;
        } else {
          return `${contact.email}`;
        }
      } else {
        if (contact.firstname && contact.lastname) {
          return `${contact.firstname} ${contact.lastname} (${contact.phone})`;
        } else {
          return `${contact.phone}`;
        }
      }
    },
    formatDate: function(date) {
      moment.locale("fr");
      return moment(date).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .show-message {
    .message-list {
      display: none;
    }
  }
}
</style>
