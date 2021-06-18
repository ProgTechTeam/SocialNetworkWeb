<template>
  <v-app>
    <v-app-bar app :color="$vuetify.theme.dark ? '#1e1e1e' : '#ffffff'">
      <v-container class="fullWidth d-flex align-center pa-0">
        <div
          class="text-h4 pointer d-flex align-center"
          @click="redirect({ name: 'Feed' })"
        >
          <v-img max-width="48px" src="./assets/logo.png"></v-img>
          Dovecote
        </div>
        <div class="ml-auto">
          <div v-if="isAuth" class="d-flex align-center">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div
                  :class="hover ? 'focused' : ''"
                  class="pointer transition-swing rounded-pill pr-2"
                  @click="redirect(myProfileLink)"
                >
                  <Avatar
                    :avatar="currentUser.avatar"
                    size="36px"
                    :rounded="false"
                    class="mr-1"
                  />
                  {{ currentUser.email }}
                </div>
              </template>
            </v-hover>
            <v-btn @click="logout" icon>
              <v-icon> mdi-logout</v-icon>
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
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container
        :class="$vuetify.theme.dark ? 'backgroundDark' : 'backgroundLight'"
        class="pa-0 fullHeight"
        fluid
      >
        <v-container class="d-flex pa-0">
          <v-container
            fluid
            class="fullHeight menu d-flex flex-column pa-0 mt-3"
            v-if="isAuth"
          >
            <v-list
              rounded
              dense
              :color="$vuetify.theme.dark ? '#212121' : '#FAFAFA'"
            >
              <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                link
                :to="item.link"
                color="primary"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-weather-night</v-icon>
                </v-list-item-icon>
                <v-list-item-content> Темная тема </v-list-item-content>
                <v-list-item-action>
                  <v-switch v-model="$vuetify.theme.dark" inset hide-details />
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-container>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-container>
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
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
    myProfileLink() {
      const currUser = this.$store.state.auth.currentUser;
      const currUserId = currUser ? currUser.id : undefined;
      return {
        name: "Profile",
        params: { id: currUserId },
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
          auth: true,
          link: {
            name: "Feed",
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
    redirect: function (params) {
      this.$router.push(params);
    },
  },
};
</script>

<style scoped>
.menu {
  max-width: 270px;
}
.fullHeight {
  height: 100%;
}
.fullWidth {
  width: 100%;
}
.pointer {
  cursor: pointer;
}
.focused {
  background: rgba(192, 192, 192, 0.5);
}
.backgroundLight {
  background-color: #fafafa;
}
.backgroundDark {
  background-color: #212121;
}
</style>
