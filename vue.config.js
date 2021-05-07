module.exports = {
  devServer: {
    port: 4444,
    proxy: {
      "^/api": {
        target: "http://http://social-network-dovecote.herokuapp.com",
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
