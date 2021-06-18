<template>
  <v-container class="centerColumn">
    <v-icon size="70">mdi-chat-outline</v-icon>
    <p>Выберите чат!</p>
  </v-container>
</template>

<script>
export default {
  name: "NoChat",
};
</script>

<style scoped>
.centerColumn {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
