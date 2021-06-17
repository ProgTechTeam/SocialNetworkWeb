import {
  FETCH_CHAT_EXISTS_ERROR,
  FETCH_CHAT_EXISTS_REQUEST,
  FETCH_CHAT_EXISTS_SUCCESS,
  FETCH_USER_CHATS_ERROR,
  FETCH_USER_CHATS_REQUEST,
  FETCH_USER_CHATS_SUCCESS,
} from "../action-types";
import { get } from "@/core/services/http.service";
import router from "@/router";

const state = () => ({
  chatRows: [],
});

const getters = {
  chatRows: (state) => {
    return state.chatRows
      .slice()
      .sort((a, b) => a.lastMessageTime - b.lastMessageTime);
  },
};

const mutations = {
  [FETCH_USER_CHATS_SUCCESS]: (state, payload) => {
    state.chatRows = payload;
  },
  [FETCH_USER_CHATS_ERROR]: (state) => {
    state.chatRows = [];
  },
  [FETCH_CHAT_EXISTS_SUCCESS]: (state, payload) => {
    if (payload.chatId) {
      router.push({
        name: "ActiveChat",
        params: { id: payload.chatId, user: payload.user },
      });
    } else {
      router.push({ name: "NewChat", params: { user: payload.user } });
    }
  },
  [FETCH_CHAT_EXISTS_ERROR]: () => {},
};

const actions = {
  [FETCH_USER_CHATS_REQUEST]: async (context, id) => {
    return await get(`users/${id}/chats`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_USER_CHATS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_USER_CHATS_ERROR);
      });
  },
  [FETCH_CHAT_EXISTS_REQUEST]: async (context, user) => {
    return await get(`chats/exists/${user.id}`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_CHAT_EXISTS_SUCCESS, {
          chatId: payload,
          user: {
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.avatar,
          },
        });
      })
      .catch(() => {
        context.commit(FETCH_CHAT_EXISTS_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
