module.exports = {
  devServer: {
    port: 4444,
    proxy: {
      "^/api": {
        target: "http://social-network-dovecote.herokuapp.com",
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
