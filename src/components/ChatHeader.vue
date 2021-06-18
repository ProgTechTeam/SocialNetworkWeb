<template>
  <v-card>
    <v-container class="d-flex align-center">
      <Avatar :avatar="avatar" size="36px" class="mr-2" />
      <div class="text-subtitle-1 font-weight-medium">
        {{ name }}
      </div>
    </v-container>
  </v-card>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "ChatHeader",
  components: { Avatar },
  props: {
    name: String,
    avatar: String,
  },
};
</script>

<style scoped></style>
