<template>
  <v-app>
    <v-app-bar app class="d-flex">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn text link :to="{ name: 'Feed' }">Dovecote</v-btn>
      <div v-if="isAuth">
        <v-btn text class="mx-1" rounded link :to="myProfileLink">
          <Avatar
            :avatar="currentUser.avatar"
            size="36px"
            :rounded="false"
            class="mr-2"
          />
          {{ currentUser.email }}
        </v-btn>
        <v-btn @click="logout" class="mx-1" outlined>
          <v-icon left> mdi-logout</v-icon>
          Выйти
        </v-btn>
      </div>
      <div v-else>
        <v-btn link :to="{ name: 'Login' }" color="accent" class="mx-1">
          Вход
        </v-btn>
        <v-btn link :to="{ name: 'Registration' }" class="mx-1">
          Регистрация
        </v-btn>
      </div>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        hide-details
        prepend-icon="mdi-weather-night"
        label="Темная тема"
      />
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list rounded>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { LOGOUT_REQUEST } from "./store/action-types";
import Avatar from "@/components/Avatar";

export default {
  name: "App",
  components: { Avatar },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
    myProfileLink() {
      return {
        name: "Profile",
        params: { id: this.$store.state.auth.currentUser.id },
      };
    },
    menuItems() {
      const currUser = this.$store.state.auth.currentUser;
      const currUserId = currUser ? currUser.id : undefined;
      const items = [
        {
          title: "Мой профиль",
          icon: "mdi-account-circle",
          auth: true,
          link: {
            name: "Profile",
            params: { id: currUserId },
          },
        },
        {
          title: "Новости",
          icon: "mdi-view-dashboard",
          auth: false,
          link: {
            name: "Feed",
            params: { id: this.$store.state.auth.currentUser.id },
          },
        },
        {
          title: "Друзья",
          icon: "mdi-account-multiple",
          auth: true,
          link: {
            name: "Friends",
            params: { id: currUserId },
          },
        },
        {
          title: "Чаты",
          icon: "mdi-chat",
          auth: true,
          link: {
            name: "NoChat",
          },
        },
      ];
      return items.filter((item) => !item.auth || this.$store.getters.isAuth);
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch(LOGOUT_REQUEST).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>
