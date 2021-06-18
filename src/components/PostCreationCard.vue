<template>
  <v-card>
    <v-container fluid class="d-flex justify-space-between align-start">
      <Avatar
        :avatar="currentUser.avatar"
        size="56px"
        :rounded="false"
        class="mr-2"
      />

      <v-textarea
        v-model="postPayload"
        auto-grow
        rows="1"
        hide-details
        filled
        rounded
        :label="isMyProfile ? 'Что у вас нового?' : 'Напишите что нибудь...'"
        :append-outer-icon="postPayload ? 'mdi-content-save' : null"
        @click:append-outer="savePost"
      />
    </v-container>
  </v-card>
</template>

<script>
import { CREATE_USER_POST_REQUEST } from "@/store/action-types";
import Avatar from "@/components/Avatar";

export default {
  name: "PostCreationCard",
  components: { Avatar },
  props: {
    user: {},
    isMyProfile: Boolean,
  },
  data() {
    return {
      postPayload: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    savePost: function () {
      const newPost = {
        payload: this.postPayload,
        authorId: this.$store.state.auth.currentUser.id,
        ownerId: this.user.id,
      };
      this.$store.dispatch(CREATE_USER_POST_REQUEST, newPost);
      this.postPayload = "";
    },
  },
};
</script>

<style scoped></style>
