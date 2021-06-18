import {
  FETCH_USER_NEWS_REQUEST,
  FETCH_USER_NEWS_SUCCESS,
  FETCH_USER_NEWS_ERROR,
} from "../action-types";
import { get } from "../../core/services/http.service";

const state = () => ({
  news: [],
});

const getters = {
  news: (state) => {
    return state.news.slice().sort((a, b) => b.id - a.id);
  },
};

const mutations = {
  [FETCH_USER_NEWS_SUCCESS]: (state, payload) => {
    state.news = payload;
  },
  [FETCH_USER_NEWS_ERROR]: (state) => {
    state.news = [];
  },
};

const actions = {
  [FETCH_USER_NEWS_REQUEST]: async (context, id) => {
    return await get(`users/${id}/news`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_USER_NEWS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_USER_NEWS_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
