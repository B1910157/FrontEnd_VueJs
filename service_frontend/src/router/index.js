import { createWebHistory, createRouter } from "vue-router";
import Food from "@/views/foods/Food.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/foods",
    name: "foods",
    component: Food,
  },
  {
    path: "/addFood/",
    name: "addFood",
    component: () => import("@/views/foods/addFood.vue"),
  },
  {
    path: "/editFood/:id",
    name: "editFood",
    component: () => import("@/views/foods/editFood.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/login/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/menu/",
    name: "menu",
    component: () => import("@/views/menu/Menu.vue"),
  },
  {
    path: "/drinks",
    name: "drinks",
    component: () => import("@/views/drinks/Drink.vue"),
  },
  {
    path: "/editDrink/:id",
    name: "editDrink",
    component: () => import("@/views/drinks/editDrink.vue"),
    props: true,
  },
  {
    path: "/addDrink/",
    name: "addDrink",
    component: () => import("@/views/drinks/addDrink.vue"),
  },
  {
    path: "/other",
    name: "other",
    component: () => import("@/views/other/Other.vue"),
  },
  {
    path: "/editOther/:id",
    name: "editOther",
    component: () => import("@/views/other/editOther.vue"),
    props: true,
  },
  {
    path: "/addOther/",
    name: "addOther",
    component: () => import("@/views/other/addOther.vue"),
  },

  {
    path: "/orders/",
    name: "orders",
    component: () => import("@/views/order/Order.vue"),
  },
  {
    path: "/detailOrder/:orderId",
    name: "detailOrder",
    component: () => import("@/views/order/DetailOrder.vue"),
  },
  {
    path: "/jobs/",
    name: "jobs",
    component: () => import("@/views/jobs/Job.vue"),
  },
  {
    path: "/chart/",
    name: "chart",
    component: () => import("@/views/Chart.vue"),
  },
  {
    path: "/addJob/",
    name: "addJob",
    component: () => import("@/views/jobs/addJob.vue"),
  },
  {
    path: "/detailJob/:jobId",
    name: "detailJob",
    component: () => import("@/views/jobs/detailJob.vue"),
    props: true,
  },
  {
    path: "/feedback/",
    name: "feedback",
    component: () => import("@/views/Feedback.vue"),
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
