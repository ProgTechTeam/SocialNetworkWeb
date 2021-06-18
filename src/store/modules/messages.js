import {
  FETCH_CHAT_MESSAGES_ERROR,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../action-types";
import { get } from "@/core/services/http.service";
import { post } from "../../core/services/http.service";

const state = () => ({
  messages: [],
});

const getters = {};

const mutations = {
  [FETCH_CHAT_MESSAGES_SUCCESS]: (state, payload) => {
    state.messages = payload;
  },
  [FETCH_CHAT_MESSAGES_ERROR]: (state) => {
    state.messages = [];
  },
  [SEND_MESSAGE_SUCCESS]: (state, payload) => {
    state.messages.push(payload);
  },
  [SEND_MESSAGE_ERROR]: () => {},
};

const actions = {
  [FETCH_CHAT_MESSAGES_REQUEST]: async (context, id) => {
    return await get(`chats/${id}/messages`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_CHAT_MESSAGES_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_CHAT_MESSAGES_ERROR);
      });
  },
  [SEND_MESSAGE_REQUEST]: async (context, message) => {
    return await post(`/messages`, message)
      .then((response) => {
        const payload = response && response.data;
        context.commit(SEND_MESSAGE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(SEND_MESSAGE_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
