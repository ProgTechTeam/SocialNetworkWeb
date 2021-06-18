<template>
  <v-card
    rounded="xl"
    :class="isMyMessage ? 'rightContainer' : 'leftContainer'"
    class="pt-2 px-4 my-2"
    :outlined="!isMyMessage"
    flat
    :color="isMyMessage ? 'accent' : ''"
    max-width="75%"
    min-width="25%"
  >
    <span style="white-space: pre-wrap">
      {{ message.payload }}
    </span>
    <div class="text-caption text--secondary text-right">
      {{ getFormattedTime(message.createdAt) }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Message",
  props: {
    isMyMessage: Boolean,
    message: {},
  },
  methods: {
    getFormattedTime: function (timeRaw) {
      const time = new Date(timeRaw);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}`;
    },
  },
};
</script>

<style scoped>
.rightContainer {
  margin-right: 0;
  margin-left: auto;
}
.leftContainer {
  margin-right: auto;
  margin-left: 0;
}
</style>
