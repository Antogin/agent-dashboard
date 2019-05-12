import * as axios from "axios";

const state = {
    messages: [],
    message: null
};
const getters = {
    messages(state) {
        return state.messages
    },
    message(state) {
        return state.message
    },
};
const actions = {
    getMessages({ commit }, agencyId) {
        axios.get(`http://localhost:8080/realtors/${agencyId}/messages`).then(({ data }) => {
            commit("setMessages", data);
        });
    },
    getMessage({ commit }, payload) {
        const { agencyId, messageId } = payload;

        axios.get(`http://localhost:8080/realtors/${agencyId}/messages/${messageId}`).then(({ data }) => {
            commit("setMessage", data);
        });
    }
};
const mutations = {
    setMessages(state, payload) {
        state.messages = payload
    },
    setMessage(state, payload) {
        state.message = payload
    }
};

export const messagesStore = {
    state,
    getters,
    actions,
    mutations
};
