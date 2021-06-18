<template>
  <v-list-item
    link
    :to="{
      name: 'ActiveChat',
      params: {
        id: item.id,
        user: { name: item.name, avatar: item.avatar },
      },
    }"
    class="mb-0"
  >
    <v-list-item-avatar>
      <Avatar size="36px" :avatar="item.avatar" :rounded="false" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="d-flex justify-space-between">
        <div>{{ item.name }}</div>
        <div class="text-body-2 text--secondary">
          {{ getFormattedTime(item.lastMessageTime) }}
        </div>
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ item.lastMessageAuthor }}: {{ item.lastMessagePayload }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "ChatRow",
  components: { Avatar },
  props: {
    item: {},
  },
  methods: {
    getFormattedTime: function (timeRaw) {
      const time = new Date(timeRaw);
      return `${time.getHours()}:${time.getMinutes()}`;
    },
  },
};
</script>

<style scoped></style>
