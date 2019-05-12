<template>
  <v-layout row :class="$route.params.messageId ? 'show-message' : null">
    <v-flex class="message-list" xs12 sm4>
      <v-card class="message-card" v-on:scroll.passive="onScroll">
        <v-list two-line>
          <template v-for="(message, index) in messages">
            <v-list-tile
              :key="message.id"
              avatar
              ripple
              :class="!message.read ? 'read' : null"
              :to="`/agency/${$route.params.agencyId}/message/${message.id}`"
            >
              <v-list-tile-action>
                <v-icon>{{ message.type }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  :class="
                    [
                      !message.read ? 'font-weight-bold' : null,
                      'list-title'
                    ].join(' ')
                  "
                >
                  {{ message.contact | formatContact(message.type) }}
                  <span class="date">{{ message.date | formatDate }}</span>
                </v-list-tile-title>
                <v-list-tile-title>{{ message.body }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">
                  {{ message.subject }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < messages.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <div class="pa-5 message-view">
      <router-view />
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
      fetching: false
    };
  },
  methods: {
    ...mapActions(["getAgency", "getMessages", "loadMoreMessages"]),
    onScroll(e) {
      const { fetching } = this;
      const { scrollHeight, scrollTop, offsetHeight } = e.srcElement;

      if (!fetching && offsetHeight + scrollTop >= scrollHeight - 2) {
        const { agencyId } = this.$route.params;

        this.fetching = true;
        this.loadMoreMessages(agencyId).then(() => {
          this.fetching = false;
        });
      }
    }
  },
  computed: {
    ...mapGetters(["messages"])
  },
  watch: {
    "$route.params.agencyId": function(agencyId) {
      this.getAgency(agencyId);
      this.getMessages(agencyId);
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
.list-title {
  span {
    float: right;
    color: #1b5098;
  }
}

.v-list {
  .v-icon {
    color: #ccc;
  }

  .read {
    .v-icon {
      color: #1b5098;
    }
  }
}

.message-card {
  height: calc(100vh - 64px);
  overflow-y: scroll;
}

@media only screen and (max-width: 960px) {
  .message-card {
    height: calc(100vh - 48px);
    overflow-y: scroll;
  }
}
@media only screen and (max-width: 600px) {
  .show-message {
    .message-list {
      display: none;
    }
  }
  .message-card {
    height: calc(100vh - 56px);
    overflow-y: scroll;
  }
}
</style>
