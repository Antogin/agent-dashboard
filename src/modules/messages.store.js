import * as axios from "axios";

const state = {
  messages: [],
  page: 6,
  message: null
};
const getters = {
  messages(state) {
    return state.messages;
  },
  message(state) {
    return state.message;
  }
};
const actions = {
  getMessages({ commit }, agencyId) {
    axios
      .get(`http://localhost:8080/realtors/${agencyId}/messages`)
      .then(({ data }) => {
        commit("setMessages", data);
      });
  },
  loadMoreMessages({ commit, state }, agencyId) {
    const { page } = state;
    if (!page) {
      return;
    }

    return new Promise(resolve => {
      axios
        .get(`http://localhost:8080/realtors/${agencyId}/messages`, {
          params: {
            page: page + 1
          }
        })
        .then(({ data }) => {
          resolve();
          commit("appendMessages", data);
        })
        .catch(e => {
          resolve();
          if (e.response.status === 416) {
            commit("noMoreMessages");
          }
        });
    });
  },
  getMessage({ commit }, payload) {
    const { agencyId, messageId } = payload;

    axios
      .get(`http://localhost:8080/realtors/${agencyId}/messages/${messageId}`)
      .then(({ data }) => {
        commit("setMessage", data);
        const body = { read: 1 };
        if (!data.read) {
          axios
            .post(
              `http://localhost:8080/realtors/${agencyId}/messages/${messageId}`,
              body
            )
            .then(() => {
              commit("setMessageRead", data.id);
              commit("decrementMessageCount", agencyId);
            });
        }
      });
  }
};
const mutations = {
  setMessages(state, payload) {
    state.messages = payload;
    state.page = 1;
  },
  appendMessages(state, payload) {
    state.messages = state.messages.concat(payload);
    state.page++;
  },
  setMessageRead(state, payload) {
    state.messages = state.messages.map(message => {
      if (message.id === payload) {
        return {
          ...message,
          read: true
        };
      }
      return message;
    });
  },
  setMessage(state, payload) {
    state.message = payload;
  },
  noMoreMessages(state) {
    state.page = 0;
  }
};

export const messagesStore = {
  state,
  getters,
  actions,
  mutations
};
