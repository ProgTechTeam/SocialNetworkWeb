<template>
  <v-container fluid class="fullHeight d-flex flex-column align-end pa-0">
    <v-container fluid class="pa-0">
      <ChatHeader
        :name="user ? user.name : ''"
        :avatar="user ? user.avatar : ''"
      />
    </v-container>
    <v-container fluid class="d-flex flex-column pa-0 messageContainer">
      <Message
        v-for="message in messages"
        :id="`ref-message-${message.id}`"
        :key="message.id"
        :is-my-message="currUserId === message.author.id"
        :message="message"
      />
    </v-container>
    <v-container fluid class="mt-auto pa-0">
      <ChatTextField @sendMessage="sendMessage" />
    </v-container>
  </v-container>
</template>

<script>
import ChatHeader from "@/components/ChatHeader";
import ChatTextField from "@/components/ChatTextField";
import {
  FETCH_CHAT_MESSAGES_REQUEST,
  SEND_MESSAGE_REQUEST,
} from "../../store/action-types";
import Message from "../../components/Message";

export default {
  name: "ActiveChat",
  components: { Message, ChatTextField, ChatHeader },
  props: {
    id: Number,
    user: {},
  },
  computed: {
    messages() {
      return this.$store.state.messages.messages;
    },
    currUserId() {
      return this.$store.state.auth.currentUser.id;
    },
  },
  methods: {
    sendMessage: function (payload) {
      this.$store.dispatch(SEND_MESSAGE_REQUEST, {
        chatId: this.id,
        payload: payload,
      });
    },
    scrollToLastMessage: function () {
      if (!this.messages.length) {
        return;
      }
      const msgId = this.messages[this.messages.length - 1].id;
      const ref = `#ref-message-${msgId}`;
      this.$vuetify.goTo(ref, { container: ".messageContainer" });
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_CHAT_MESSAGES_REQUEST, this.id);
  },
  updated() {
    this.scrollToLastMessage();
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(FETCH_CHAT_MESSAGES_REQUEST, to.params.id);
    this.scrollToLastMessage();
    next();
  },
};
</script>

<style scoped>
.fullHeight {
  height: 100%;
}
.messageContainer {
  height: 500px;
  overflow-y: scroll;
}
.messageContainer::-webkit-scrollbar {
  display: none;
}
.messageContainer {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
