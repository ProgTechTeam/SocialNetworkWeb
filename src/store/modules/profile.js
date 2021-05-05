import {
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from "../action-types";
import { get } from "../../core/services/http.service";

function getDefaultUserData() {
  return {
    id: Number,
    firstName: "",
    lastName: "",
    email: "",
    friends: Number,
    subscribers: Number,
    subscriptions: Number,
  };
}

const state = () => ({
  userData: getDefaultUserData(),
});

const getters = {};

const mutations = {
  [FETCH_PROFILE_SUCCESS]: (state, payload) => {
    state.userData = payload;
  },
  [FETCH_PROFILE_ERROR]: (state) => {
    state.userData = getDefaultUserData();
  },
};

const actions = {
  [FETCH_PROFILE_REQUEST]: async (context, id) => {
    return await get(`users/${id}`)
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_PROFILE_SUCCESS, payload);
      })
      .catch(() => {
        context.commit(FETCH_PROFILE_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
