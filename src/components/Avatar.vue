<template>
  <v-avatar color="accent" :size="size" :rounded="rounded">
    <v-img v-if="!!avatar" :src="avatar" alt="avatar" />
    <v-icon v-else> mdi-account-circle </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    avatar: String,
    size: String,
    rounded: Boolean,
  },
};
</script>

<style scoped></style>
