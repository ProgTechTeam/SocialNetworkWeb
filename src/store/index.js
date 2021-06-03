import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import profile from "./modules/profile";
import posts from "./modules/posts";
import complaints from "./modules/complaints";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    profile,
    posts,
    complaints,
  },
  script: true,
});
