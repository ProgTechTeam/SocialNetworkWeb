<template>
  <v-card>
    <v-container fluid>
      <v-row class="chatView">
        <v-col cols="4">
          <v-list rounded subheader>
            <v-subheader inset>Чаты</v-subheader>
            <template v-for="(item, index) in chats">
              <v-list-item
                :key="item.id"
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
              <v-divider
                v-if="index !== chats.length - 1"
                :key="'divider-' + item.id"
                inset
              />
            </template>
          </v-list>
        </v-col>
        <v-divider vertical />
        <v-col cols="8">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Avatar from "@/components/Avatar";
import { FETCH_USER_CHATS_REQUEST } from "@/store/action-types";

export default {
  name: "Chats",
  components: { Avatar },
  computed: {
    chats() {
      return this.$store.getters.chatRows;
    },
  },
  methods: {
    getFormattedTime: function (timeRaw) {
      const time = new Date(timeRaw);
      return `${time.getHours()}:${time.getMinutes()}`;
    },
  },
  mounted() {
    this.$store.dispatch(
      FETCH_USER_CHATS_REQUEST,
      this.$store.state.auth.currentUser.id
    );
  },
};
</script>

<style scoped>
.chatView {
  height: 600px;
}
</style>
