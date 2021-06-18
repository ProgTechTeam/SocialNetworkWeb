<template>
  <v-container fluid>
    <PostCard
      v-for="post in news"
      :key="post.id"
      :post-data="post"
      class="mb-3"
    />
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard";
import { FETCH_USER_NEWS_REQUEST } from "@/store/action-types";

export default {
  name: "Feed",
  components: {
    PostCard,
  },
  computed: {
    news() {
      return this.$store.getters.posts;
    },
  },
  mounted() {
    this.$store.dispatch(
      FETCH_USER_NEWS_REQUEST,
      this.$store.state.auth.currentUser.id
    );
  },
};
</script>

<style scoped></style>
