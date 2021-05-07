module.exports = {
  devServer: {
    port: 4444,
    proxy: {
      "^/api": {
        target: "https://social-network-dovecote.herokuapp.com",
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
