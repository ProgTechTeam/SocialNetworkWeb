<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-3">
          <v-responsive :aspect-ratio="1">
            <v-avatar size="100%" color="accent" rounded
              ><v-icon> mdi-account-circle </v-icon></v-avatar
            >
          </v-responsive>
          <div v-if="isMyProfile">
            <v-btn class="mt-3" block>Редактировать</v-btn>
          </div>
          <div v-else>
            <v-btn class="mt-3" block color="primary" v-if="user.subscribed" @click="unsubscribe">Отписаться</v-btn>
            <v-btn class="mt-3" block color="primary" v-else @click="subscribe">Подписаться</v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>{{ user.firstName }} {{ user.lastName }}</v-card-title>
          <v-divider class="mx-3" />
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text link :to="{ name: 'Friends', params: { id: user.id } }"
              >Друзья {{ user.friends }}</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              link
              :to="{ name: 'Subscribers', params: { id: user.id } }"
              >Подписчики {{ user.subscribers }}</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              text
              link
              :to="{ name: 'Subscriptions', params: { id: user.id } }"
              >Подписки {{ user.subscriptions }}</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {FETCH_PROFILE_REQUEST, SUBSCRIBE_TO_USER_REQUEST, UNSUBSCRIBE_FROM_USER_REQUEST} from "../store/action-types";

export default {
  name: "Profile",
  props: {
    id: Number,
  },
  data() {
    return {
      isMyProfile: this.id === this.$store.state.auth.currentUser.id,
    }
  },
  computed: {
    user() {
      return this.$store.state.profile.userData;
    },
  },
  methods: {
    subscribe: function () {
      this.$store.dispatch(SUBSCRIBE_TO_USER_REQUEST, this.id);
    },
    unsubscribe: function () {
      this.$store.dispatch(UNSUBSCRIBE_FROM_USER_REQUEST, this.id);
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PROFILE_REQUEST, this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(FETCH_PROFILE_REQUEST, to.params.id);
    next();
  },
};
</script>

<style scoped></style>
