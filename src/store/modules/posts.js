import {
  CANCEL_LIKE_POST_ERROR,
  CANCEL_LIKE_POST_REQUEST,
  CANCEL_POST_LIKE_SUCCESS,
  CREATE_USER_POST_ERROR,
  CREATE_USER_POST_REQUEST,
  CREATE_USER_POST_SUCCESS,
  FETCH_USER_POSTS_ERROR,
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  LIKE_POST_ERROR,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../action-types";
import { get, post, put } from "../../core/services/http.service";

const state = () => ({
  posts: [],
});

const getters = {
  posts: (state) => {
    return state.posts.slice().sort((a, b) => b.id - a.id);
  },
};

const mutations = {
  [FETCH_USER_POSTS_SUCCESS]: (state, payload) => {
    state.posts = payload;
  },
  [FETCH_USER_POSTS_ERROR]: (state) => {
    state.posts = [];
  },
  [CREATE_USER_POST_SUCCESS]: (state, payload) => {
    state.posts.push(payload);
  },
  [CREATE_USER_POST_ERROR]: () => {},
  [LIKE_POST_SUCCESS]: (state, payload) => {
    const index = state.posts.findIndex((x) => x.id === payload.id);
    state.posts[index].likedUsers = payload.likedUsers;
  },
  [LIKE_POST_ERROR]: () => {},
  [CANCEL_POST_LIKE_SUCCESS]: (state, payload) => {
    const index = state.posts.findIndex((x) => x.id === payload.id);
    state.posts[index].likedUsers = payload.likedUsers;
  },
  [CANCEL_LIKE_POST_ERROR]: () => {},
};

const actions = {
  [FETCH_USER_POSTS_REQUEST]: async (context, id) => {
    return await get(`users/${id}/posts`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_USER_POSTS_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_USER_POSTS_ERROR);
      });
  },
  [CREATE_USER_POST_REQUEST]: async (context, postData) => {
    return await post("posts", postData)
      .then((response) => {
        const payload = response && response.data;
        context.commit(CREATE_USER_POST_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CREATE_USER_POST_ERROR);
      });
  },
  [LIKE_POST_REQUEST]: async (context, payload) => {
    return await put(`users/${payload}/like`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(LIKE_POST_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(LIKE_POST_ERROR);
      });
  },
  [CANCEL_LIKE_POST_REQUEST]: async (context, payload) => {
    return await put(`users/${payload}/cancel-like`, payload)
      .then((response) => {
        const payload = response && response.data;
        context.commit(CANCEL_POST_LIKE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(CANCEL_LIKE_POST_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
