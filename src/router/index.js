import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/assignment2",
        name: "assignment2",
        component: () =>
          import("../views/assignment2.vue"),
    },
    {
        path: "/assignment4",
        name: "assignment4",
        component: () =>
          import("../views/assignment4.vue"),
    }
]
const router = new VueRouter({
  routes,
});

export default router;