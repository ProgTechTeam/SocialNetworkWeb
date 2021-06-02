<template>
  <v-card>
    <v-container fluid class="d-flex justify-start align-center">
      <v-avatar size="56" color="accent" class="mr-2">
        <img
          v-if="!!postData.author.avatar"
          :src="postData.author.avatar"
          alt="avatar"
        />
        <v-icon v-else> mdi-account-circle</v-icon>
      </v-avatar>

      <div class="d-flex flex-column">
        <div class="text-subtitle-1 font-weight-medium">
          {{ postData.author.name }}
        </div>

        <div class="text-subtitle-2 text--secondary">
          {{ new Date(postData.createdAt).toDateString() }}
        </div>
      </div>
    </v-container>

    <v-container fluid>
      {{ postData.payload }}
    </v-container>
    <v-row class="mt-12">
      <v-col class="ml-5" cols="12" sm="3">
        <v-btn
          icon
          @click="likeAction"
          :color="/*this.likesCount*/ isLiked ? 'pink' : ''"
        >
          <v-icon>mdi-heart</v-icon>
          <span v-text="this.postData.likedUsers.length"></span>
        </v-btn>
      </v-col>
      <div v-if="isToxic">
        <v-col class="ml-2" cols="12" sm="10">
          <v-chip class="ma-2" color="green" text-color="white"> Toxic </v-chip>
        </v-col>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import {
  LIKE_POST_REQUEST,
  CANCEL_LIKE_POST_REQUEST,
  FETCH_TOXIC_REQUEST,
} from "@/store/action-types";

export default {
  name: "PostCard",
  props: {
    postData: {},
  },
  computed: {
    isLiked() {
      return this.postData.likedUsers.find(
        (element) => element.id === this.$store.state.auth.currentUser.id
      );
    },
    isToxic() {
      console.log(this.$store.getters.toxicRates[this.postData.id]);
      return this.$store.getters.toxicRates[this.postData.id] > 0.8;
    },
  },
  methods: {
    likeAction: function () {
      if (this.isLiked) {
        this.cancelLike();
      } else {
        this.like();
      }
    },
    like: function () {
      this.$store.dispatch(LIKE_POST_REQUEST, this.postData.id);
      //this.$store.dispatch(FETCH_TOXIC_REQUEST, {"inputs": this.postData.payload});
    },
    cancelLike: function () {
      this.$store.dispatch(CANCEL_LIKE_POST_REQUEST, this.postData.id);
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_TOXIC_REQUEST, this.postData);
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch(FETCH_TOXIC_REQUEST, this.postData /*to.params.id*/);
    next();
  },
};
</script>

<style scoped></style>
