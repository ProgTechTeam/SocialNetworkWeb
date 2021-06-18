import {
  CREATE_PRIVATE_CHAT_ERROR,
  CREATE_PRIVATE_CHAT_REQUEST,
  CREATE_PRIVATE_CHAT_SUCCESS,
  FETCH_CHAT_EXISTS_ERROR,
  FETCH_CHAT_EXISTS_REQUEST,
  FETCH_CHAT_EXISTS_SUCCESS,
  FETCH_USER_CHATS_ERROR,
  FETCH_USER_CHATS_REQUEST,
  FETCH_USER_CHATS_SUCCESS,
  SEND_MESSAGE_REQUEST,
} from "../action-types";
import { get } from "@/core/services/http.service";
import router from "@/router";
import { post } from "../../core/services/http.service";

const state = () => ({
  chatRows: [],
});

const getters = {
  chatRows: (state) => {
    return state.chatRows
      .slice()
      .sort(
        (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );
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
  [CREATE_PRIVATE_CHAT_SUCCESS]: (state, payload) => {
    state.chatRows.push(payload);
  },
  [CREATE_PRIVATE_CHAT_ERROR]: () => {},
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
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          },
        });
      })
      .catch(() => {
        context.commit(FETCH_CHAT_EXISTS_ERROR);
      });
  },
  [CREATE_PRIVATE_CHAT_REQUEST]: async (context, data) => {
    return await post(`chats/private`, { userId: data.user.id })
      .then((response) => {
        const payload = response && response.data;
        context.commit(CREATE_PRIVATE_CHAT_SUCCESS, payload);
        context.dispatch(SEND_MESSAGE_REQUEST, {
          chatId: payload.id,
          payload: data.payload,
        });
        router.push({
          name: "ActiveChat",
          params: {
            id: payload.id,
            user: data.user,
          },
        });
      })
      .catch(() => {
        context.commit(CREATE_PRIVATE_CHAT_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
