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
    path: "/feedback",
    name: "feedback",
    component: () => import("@/views/FeedBack/FeedBack.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/Users/User.vue"),
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
    path: "/food_category/",
    name: "food_category",
    component: () => import("@/views/Category/Food_category.vue"),
  },
  {
    path: "/comments/",
    name: "comments",
    component: () => import("@/views/Comments/Comments.vue"),
  },
  {
    path: "/detailService/:service_id",
    name: "detailService",
    component: () => import("@/views/Services/ServiceDetail.vue"),
    props: true,
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
