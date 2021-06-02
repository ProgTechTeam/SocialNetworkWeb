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
  props: {
    id: Number,
  },
  components: {
    PostCard,
  },
  computed: {
    news() {
      return this.$store.getters.news;
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_USER_NEWS_REQUEST, this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(FETCH_USER_NEWS_REQUEST, to.params.id);
    next();
  },
};
</script>

<style scoped></style>
