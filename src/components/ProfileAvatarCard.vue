<template>
  <v-card class="pa-3">
    <v-responsive aspect-ratio="1">
      <Avatar :avatar="user.avatar" size="100%" :rounded="true" />
    </v-responsive>
    <div v-if="isMyProfile">
      <v-btn class="mt-3" block>Редактировать</v-btn>
    </div>
    <div v-else>
      <v-btn class="mt-3" block v-if="user.subscribed" @click="unsubscribe">
        Отписаться
      </v-btn>
      <v-btn class="mt-3" block v-else @click="subscribe"> Подписаться </v-btn>
      <v-btn class="mt-3" block color="primary" @click="openChat">
        Написать сообщение
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {
  FETCH_CHAT_EXISTS_REQUEST,
  SUBSCRIBE_TO_USER_REQUEST,
  UNSUBSCRIBE_FROM_USER_REQUEST,
} from "@/store/action-types";
import Avatar from "@/components/Avatar";

export default {
  name: "ProfileAvatarCard",
  components: { Avatar },
  props: {
    user: {},
    isMyProfile: Boolean,
  },
  methods: {
    subscribe: function () {
      this.$store.dispatch(SUBSCRIBE_TO_USER_REQUEST, this.user.id);
    },
    unsubscribe: function () {
      this.$store.dispatch(UNSUBSCRIBE_FROM_USER_REQUEST, this.user.id);
    },
    openChat: function () {
      this.$store.dispatch(FETCH_CHAT_EXISTS_REQUEST, {
        id: this.user.id,
        name: `${this.user.firstName} ${this.user.lastName}`,
        avatar: this.user.avatar,
      });
    },
  },
};
</script>

<style scoped></style>
