import {
  CANCEL_LIKE_POST_ERROR,
  COMPLAINT_POST_ERROR,
  COMPLAINT_POST_REQUEST,
  COMPLAINT_POST_SUCCESS,
  FETCH_COMPLAINTS_TYPES_ERROR,
  FETCH_COMPLAINTS_TYPES_REQUEST,
  FETCH_COMPLAINTS_TYPES_SUCCESS,
} from "../action-types";
import { get, put } from "../../core/services/http.service";

const state = () => ({
  posts: [],
});

const getters = {
  complaintsTypes: (state) => {
    return state.complaintsTypes;
  },
};

const mutations = {
  [FETCH_COMPLAINTS_TYPES_SUCCESS]: (state, payload) => {
    state.complaintsTypes = payload;
  },
  [FETCH_COMPLAINTS_TYPES_ERROR]: (state) => {
    state.complaintsTypes = [];
  },
  [COMPLAINT_POST_SUCCESS]: () => {},
  [COMPLAINT_POST_ERROR]: () => {},
};

const actions = {
  [FETCH_COMPLAINTS_TYPES_REQUEST]: async (context) => {
    return await get(`posts/complaints-types`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_COMPLAINTS_TYPES_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_COMPLAINTS_TYPES_ERROR);
      });
  },
  [COMPLAINT_POST_REQUEST]: async (context, data) => {
    return await put(`posts/${data.postId}/complaint/${data.complaintTypeId}`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(COMPLAINT_POST_SUCCESS, payload);
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
