<template>
  <v-flex xs12 v-if="message">
    <v-card>
      <v-layout>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{`${message.contact.firstname} ${message.contact.lastname}`}}</div>
            <div>Email {{message.contact.email}}</div>
            <div>Phone {{message.contact.phone}}</div>
          </div>
        </v-card-title>
      </v-layout>
    </v-card>
    <v-card class="my-2">
      <v-layout>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{`${message.contact.firstname} ${message.contact.lastname}`}}</div>
            <div>{{message.date | formatDate}}</div>
            <div>{{message.body}}</div>
          </div>
        </v-card-title>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as moment from "moment";

export default {
  mounted() {
    const { agencyId, messageId } = this.$route.params;
    this.getMessage({ agencyId, messageId });
  },
  methods: {
    ...mapActions(["getMessage"])
  },
  computed: {
    ...mapGetters(["message"])
  },
  filters: {
    formatDate: function(date) {
      moment.locale("fr");
      return moment(date).format("LLL");
    }
  },
  watch: {
    "$route.params.messageId": function(agencyId) {
      this.getMessage({
        agencyId: this.$route.params.agencyId,
        messageId: this.$route.params.messageId
      });
    }
  }
};
</script>