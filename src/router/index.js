import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Registration from "../views/Registration";
import Feed from "../views/Feed";
import Users from "../views/users/Users";
import AllUsers from "../views/users/AllUsers";
import Friends from "../views/users/Friends";
import Subscribers from "../views/users/Subscribers";
import Subscriptions from "../views/users/Subscriptions";

Vue.use(VueRouter);

function castToInt(route) {
  return {
    id: Number(route.params.id),
  };
}

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
    path: "/users",
    component: Users,
    children: [
      {
        path: "/users/all",
        name: "AllUsers",
        component: AllUsers,
      },
      {
        path: "/users/:id/friends",
        name: "Friends",
        component: Friends,
        props: castToInt,
      },
      {
        path: "/users/:id/subscribers",
        name: "Subscribers",
        component: Subscribers,
        props: castToInt,
      },
      {
        path: "/users/:id/subscriptions",
        name: "Subscriptions",
        component: Subscriptions,
        props: castToInt,
      },
    ],
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
