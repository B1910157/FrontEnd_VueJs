import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/",
    component: () => import("@/views/CustomerLayout.vue"),
    children: [
      {
        path: "/register/",
        name: "register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/login/",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      //Trang chủ
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/order/",
        name: "order",
        component: () => import("@/views/Order.vue"),
      },
      {
        path: "/history/",
        name: "history",
        component: () => import("@/views/History.vue"),
      },
      {
        path: "/service/:service_id",
        name: "serviceDetail",
        // component: () => import("@/views/Services.vue"),
        component: () => import("@/views/ServiceDetail.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "/feedback/",
        name: "feedback",
        component: () => import("@/views/FeedBack.vue"),
      },
      {
        path: "/info/",
        name: "info",
        component: () => import("@/views/Info.vue"),
      },
      {
        path: "/updateInfo/",
        name: "updateInfo",
        component: () => import("@/views/InfoEdit.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Global guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const allowedRoutes = ["login", "register", "home", "serviceDetail", "order"];
  if (allowedRoutes.includes(to.name) || isAuthenticated) {
    // Nếu route nằm trong danh sách không cần kiểm tra hoặc người dùng đã đăng nhập
    next();
  } else {
    next({ name: "login" }); // Chuyển hướng đến trang đăng nhập
  }
});

export default router;
