import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/agency/:agencyId",
      name: "agency",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Agency.vue"),
      children: [{
        path: "message/:messageId",
        name: "message",
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Message.vue")
      }]
    },

  ]
});
