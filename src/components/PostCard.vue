<template>
  <v-card>
    <v-container fluid class="d-flex justify-start align-center">
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
    </v-container>

    <v-container fluid>
      {{ postData.payload }}
    </v-container>
  </v-card>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  name: "PostCard",
  components: { Avatar },
  props: {
    postData: {},
  },
};
</script>

<style scoped></style>
