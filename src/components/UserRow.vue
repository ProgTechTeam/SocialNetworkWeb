<template>
  <v-card>
    <v-list-item link :to="link">
      <v-list-item-avatar>
        <Avatar :avatar="userData.avatar" size="36px" :rounded="false" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ userData.name }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn block color="primary" @click="openChat">
          Написать сообщение
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import Avatar from "@/components/Avatar";
import { FETCH_CHAT_EXISTS_REQUEST } from "../store/action-types";
export default {
  name: "UserRow",
  components: { Avatar },
  props: {
    userData: {},
  },
  computed: {
    link() {
      return { name: "Profile", params: { id: this.userData.id } };
    },
  },
  methods: {
    openChat: function () {
      this.$store.dispatch(FETCH_CHAT_EXISTS_REQUEST, this.userData);
    },
  },
};
</script>

<style scoped></style>
