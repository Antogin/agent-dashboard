import Vue from "vue";
import Vuex from "vuex";
import { realtorStore } from "./modules/realtors.store";
import { messagesStore } from "./modules/messages.store";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...realtorStore.state,
    ...messagesStore.state,
  },
  mutations: {
    ...realtorStore.mutations,
    ...messagesStore.mutations,
  },
  actions: {
    ...realtorStore.actions,
    ...messagesStore.actions,
  },
  getters: {
    ...realtorStore.getters,
    ...messagesStore.getters,
  }
});
