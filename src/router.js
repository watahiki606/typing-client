/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/lesson",
    //   name: "lesson",
    //   component: () =>
    //     import(/* webpackChunkName: "lesson" */ "./views/Lesson.vue")
    // },
    {
      path: "/typing",
      name: "typing",
      component: () =>
        import(/* webpackChunkName: "typing" */ "./views/Typing.vue")
    },
    // {
    //   path: "/signup",
    //   name: "signup",
    //   component: () =>
    //     import(/* webpackChunkName: "signup" */ "./views/Signup.vue")
    // },
    {
      path: "/",
      name: "lesson",
      component: () =>
        import(/* webpackChunkName: "lesson" */ "./views/Lesson.vue")
    }
    // {
    //   path: "/signin",
    //   name: "signin",
    //   component: () =>
    //     import(/* webpackChunkName: "signin" */ "./views/Signin.vue")
    // }
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
