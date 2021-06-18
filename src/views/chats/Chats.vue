<template>
  <v-card>
    <v-container fluid>
      <v-row class="chatView">
        <v-col cols="4">
          <v-list rounded subheader>
            <v-subheader inset>Чаты</v-subheader>
            <template v-for="(item, index) in chats">
              <ChatRow :key="index" :item="item" />
              <v-divider
                class="my-1"
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
import { FETCH_USER_CHATS_REQUEST } from "@/store/action-types";
import ChatRow from "@/components/ChatRow";

export default {
  name: "Chats",
  components: { ChatRow },
  computed: {
    chats() {
      return this.$store.getters.chatRows;
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
  height: 650px;
}
</style>
