<template>
  <v-container fluid class="fullHeight d-flex flex-column align-end pa-0">
    <v-container fluid class="pa-0">
      <ChatHeader
        :name="user ? user.name : ''"
        :avatar="user ? user.avatar : ''"
      />
    </v-container>
    <v-container fluid class="mt-auto pa-0">
      <ChatTextField />
    </v-container>
  </v-container>
</template>

<script>
import ChatHeader from "@/components/ChatHeader";
import ChatTextField from "@/components/ChatTextField";
export default {
  name: "ActiveChat",
  components: { ChatTextField, ChatHeader },
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
