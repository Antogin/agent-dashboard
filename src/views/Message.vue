<template>
  <v-flex xs12 v-if="message">
    <v-card>
      <v-layout>
        <v-card-title primary-title class="max-width card-title">
          <div class="mx-2">
            <v-icon size="15" color="primary">{{message.type}}</v-icon>
          </div>
          <v-flex>
            <div
              class="title font-weight-bold"
            >{{`${message.contact.firstname} ${message.contact.lastname}`}}</div>
            <v-flex class="d-flex">
              <v-flex xs6>Email</v-flex>
              <v-flex class="email" xs6>{{message.contact.email}}</v-flex>
            </v-flex>
            <v-flex class="d-flex">
              <v-flex xs6>Téléphone</v-flex>
              <v-flex class="phone" xs6>{{message.contact.phone}}</v-flex>
            </v-flex>
          </v-flex>
        </v-card-title>
      </v-layout>
    </v-card>
    <v-card class="my-2">
      <v-layout>
        <v-card-title primary-title>
          <div>
            <div
              class="title font-weight-bold"
            >{{`${message.contact.firstname} ${message.contact.lastname}`}}</div>
            <div class="my-3">{{message.date | formatDate}}</div>
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

<style lang="scss" scoped>
.card-title {
  align-items: baseline;
}
.email,
.phone {
  color: #1b5098;
}
</style>
