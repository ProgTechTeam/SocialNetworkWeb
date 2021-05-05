<template>
  <v-card>
    <v-list-item three-line link>
      <v-list-item-avatar>
        <v-avatar color="accent" size="36px">
          <v-icon> mdi-account-circle </v-icon>
        </v-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ userData.firstName }} {{ userData.lastName }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "UserRow",
  props: {
    userData: {},
  },
};
</script>

<style scoped></style>
