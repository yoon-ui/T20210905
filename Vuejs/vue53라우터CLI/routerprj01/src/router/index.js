import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
//아래는 페이지가 로딩될때 생기는 것 // 로딩될때 임폴트
    {
        path: "/signup",
        name:"Signup",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component : Signup
    },
    //아래는 메뉴를 클릭할 때 실행하는것 / 지연될때 임폴트
    {
        path: "/login",
        name:"Login",
        component: () => import("../components/user/UserLogin.vue")
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
