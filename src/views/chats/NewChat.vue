<template>
  <v-container fluid class="fullHeight d-flex flex-column align-end pa-0">
    <v-container fluid class="pa-0">
      <ChatHeader
        :name="user ? user.name : ''"
        :avatar="user ? user.avatar : ''"
      />
    </v-container>
    <v-container class="d-flex flex-column align-center justify-center my-auto">
      <v-icon size="70">mdi-message-draw</v-icon>
      <p>Отправьте первое сообщение!</p>
    </v-container>
    <v-container fluid class="mt-auto pa-0">
      <ChatTextField />
    </v-container>
  </v-container>
</template>

<script>
import ChatTextField from "@/components/ChatTextField";
import ChatHeader from "@/components/ChatHeader";
export default {
  name: "NewChat",
  components: { ChatHeader, ChatTextField },
  props: {
    user: {},
  },
};
</script>

<style scoped>
.fullHeight {
  height: 100%;
}
</style>
