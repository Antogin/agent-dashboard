import * as axios from "axios";

const state = {
  agencies: {},
  agency: null
};
const getters = {
  agencies(state) {
    return state.agencies;
  },
  agenciesList(state) {
    return Object.values(state.agencies);
  },
  agency(state) {
    return state.agency;
  }
};
const actions = {
  getAgencies({ commit }) {
    axios.get("http://localhost:8080/realtors").then(({ data }) => {
      commit("setAgencies", data);
    });
  },
  selectAgency({ commit }, id) {
    axios.get(`http://localhost:8080/realtors/${id}`).then(({ data }) => {
      commit("setAgency", data);
    });
  }
};
const mutations = {
  setAgencies(state, payload) {
    state.agencies = payload;
  },
  setAgency(state, payload) {
    state.agency = payload;
  }
};

export const realtorStore = {
  state,
  getters,
  actions,
  mutations
};
