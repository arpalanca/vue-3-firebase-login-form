import { createWebHistory, createRouter } from "vue-router";

import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";
import NotFound from "@/components/404.vue";

import { FirebaseAuth } from "@/lib/Firebase";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  let auth = FirebaseAuth;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && auth.currentUser === null && to.path !== "/") {
    next("/");
  } else if (requiresAuth && auth.currentUser !== null && to.path === "/") {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
