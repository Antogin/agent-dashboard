import Vue from "vue";
import Vuex from "vuex";
import { realtorStore } from "./modules/realtors.store";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...realtorStore.state
  },
  mutations: {
    ...realtorStore.mutations
  },
  actions: {
    ...realtorStore.actions
  },
  getters: {
    ...realtorStore.getters
  }
});
