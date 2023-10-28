import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/views/Services/Services.vue"),
  },
  {
    path: "/updateInfo/",
    name: "updateInfo",
    component: () => import("@/views/InfoEdit.vue"),
  },
  {
    path: "/info/",
    name: "info",
    component: () => import("@/views/Info.vue"),
  },

  {
    path: "/login/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Global guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
