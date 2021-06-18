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
        <span class="text-body-2 font-weight-medium">{{ item.name }}</span>
        <span class="text-body-2 text--secondary">
          {{ getFormattedTime(item.lastMessageTime) }}
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span v-if="item.lastMessageAuthor && item.lastMessagePayload">
          {{ item.lastMessageAuthor }}: {{ item.lastMessagePayload }}
        </span>
        <span v-else>Сообщений нет</span>
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
      return new Date(timeRaw).toUTCString().substring(5, 12);
    },
  },
};
</script>

<style scoped></style>
