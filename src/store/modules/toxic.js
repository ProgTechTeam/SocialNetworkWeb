import {
  FETCH_TOXIC_SUCCESS,
  FETCH_TOXIC_ERROR,
  FETCH_TOXIC_REQUEST,
} from "../action-types";
import { post } from "../../core/services/http.service";

const state = () => ({
  toxicRates: [],
});

const getters = {
  isToxic: (state) => (id) => {
    return state.toxicRates[id] > 0.8;
  },
};

const mutations = {
  [FETCH_TOXIC_SUCCESS]: (state, payload) => {
    const newRates = [...state.toxicRates];
    newRates[payload.id] = payload.data[0][1].score;
    state.toxicRates = newRates;
  },
  [FETCH_TOXIC_ERROR]: () => {},
};

const actions = {
  [FETCH_TOXIC_REQUEST]: async (context, data) => {
    return await post(
      `https://api-inference.huggingface.co/models/sismetanin/rubert-toxic-pikabu-2ch`,
      { inputs: data.payload }
    )
      .then((response) => {
        const payload = response && response.data;
        context.commit(FETCH_TOXIC_SUCCESS, { id: data.id, data: payload });
      })
      .catch(() => {
        context.commit(FETCH_TOXIC_ERROR);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
