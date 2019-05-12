import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: '#1b5098',
    secondary: '#b0bec5',
    accent: '#7ed321',
    error: '#b71c1c',
  }
});
