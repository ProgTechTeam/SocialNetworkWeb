<template>
  <v-app>
    <v-app-bar app color="primary" class="d-flex justify-end">
      <v-container v-if="isAuth">
        <v-avatar color="accent" size="36">
          <v-icon> mdi-account-circle </v-icon>
        </v-avatar>
        <v-btn text dark class="mx-1">{{ currentUser.email }}</v-btn>
        <v-btn @click="logout" dark class="mx-1" outlined>
          <v-icon left> mdi-logout </v-icon>
          Выйти
        </v-btn>
      </v-container>
      <v-container v-else>
        <v-btn link :to="{ name: 'Login' }" color="accent" class="mx-1">
          Вход
        </v-btn>
        <v-btn link :to="{ name: 'Registration' }" class="mx-1">
          Регистрация
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { LOGOUT_REQUEST } from "./store/action-types";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    currentUser() {
      return this.$store.state.auth.currentUser;
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
