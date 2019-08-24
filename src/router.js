/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/typing",
      name: "typing",
      component: () =>
        import(/* webpackChunkName: "typing" */ "./views/Typing.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import(/* webpackChunkName: "signup" */ "./views/Signup.vue")
    },
    {
      path: "/lesson",
      name: "lesson",
      component: () =>
        import(/* webpackChunkName: "lesson" */ "./views/Lesson.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/signin",
      name: "signin",
      component: () =>
        import(/* webpackChunkName: "signin" */ "./views/Signin.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          path: "/signin",
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next();
  }
});
export default router;
