<template>
  <v-card>
    <v-container fluid>
      <v-hover>
        <template v-slot:default="{ hover }">
          <div
            :class="hover ? 'focused' : ''"
            class="pointer transition-swing rounded-pill pr-2 d-flex justify-start align-center"
            @click="
              redirect({ name: 'Profile', params: { id: postData.author.id } })
            "
          >
            <Avatar
              :avatar="postData.author.avatar"
              size="56px"
              :rounded="false"
              class="mr-2"
            />
            <div class="d-flex flex-column">
              <div class="text-subtitle-1 font-weight-medium">
                {{ postData.author.name }}
              </div>

              <div class="text-subtitle-2 text--secondary">
                {{ new Date(postData.createdAt).toDateString() }}
              </div>
            </div>
          </div>
        </template>
      </v-hover>
    </v-container>

    <v-container>
      {{ postData.payload }}
    </v-container>

    <v-divider class="mx-3" />

    <v-card-actions>
      <v-btn icon @click="likeAction" :color="isLiked ? 'pink' : ''">
        <v-icon v-if="isLiked">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
      <span v-text="this.postData.likedUsers.length"></span>
      <div v-if="isToxic">
        <v-col class="ml-2" cols="12" sm="10">
          <v-chip class="ma-2" color="warning"> Toxic </v-chip>
        </v-col>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  LIKE_POST_REQUEST,
  CANCEL_LIKE_POST_REQUEST,
  FETCH_TOXIC_REQUEST,
} from "@/store/action-types";
import Avatar from "@/components/Avatar";
export default {
  name: "PostCard",
  components: { Avatar },
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
      return this.$store.getters.isToxic(this.postData.id);
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
    },
    cancelLike: function () {
      this.$store.dispatch(CANCEL_LIKE_POST_REQUEST, this.postData.id);
    },
    redirect: function (params) {
      this.$router.push(params);
    },
  },
  mounted() {
    this.$store.dispatch(FETCH_TOXIC_REQUEST, this.postData);
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.focused {
  background: rgba(192, 192, 192, 0.5);
}
</style>
