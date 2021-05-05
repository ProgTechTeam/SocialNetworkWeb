import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Registration from "../views/Registration";
import Feed from "../views/Feed";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/",
    name: "Feed",
    component: Feed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
