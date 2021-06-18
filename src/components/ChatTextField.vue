<template>
  <v-textarea
    v-model="messagePayload"
    rows="1"
    auto-grow
    placeholder="Напишите сообщение..."
    solo
    rounded
    clearable
    append-outer-icon="mdi-send"
    hide-details
    @click:append-outer="sendMessage"
  />
</template>

<script>
export default {
  name: "ChatTextField",
  data() {
    return {
      messagePayload: "",
    };
  },
  methods: {
    sendMessage: function () {
      this.$emit("sendMessage", this.messagePayload);
      this.messagePayload = "";
    },
  },
};
</script>

<style scoped></style>
