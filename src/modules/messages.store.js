import * as axios from "axios";

const state = {
    messages: []
};
const getters = {
    messages(state) {
        return state.messages
    }
};
const actions = {
    getMessages({ commit }, agencyId) {
        axios.get(`http://localhost:8080/realtors/${agencyId}/messages`).then(({ data }) => {
            console.log(data)
            commit("setMessages", data);
        });
    }
};
const mutations = {
    setMessages(state, payload) {
        state.messages = payload
    }
};

export const messagesStore = {
    state,
    getters,
    actions,
    mutations
};
