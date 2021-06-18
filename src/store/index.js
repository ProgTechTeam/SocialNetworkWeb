import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import profile from "./modules/profile";
import posts from "./modules/posts";
import news from "./modules/news";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    profile,
    posts,
    news,
  },
  script: true,
});
