import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Signup from "../views/Signup.vue";
import PostSingle from "../views/PostSingle";
import Profile from "../views/Profile";
import Users from "../views/Users";




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: "Feed",
    component: Feed,
  },
  {
    path: '/signup',
    name: "Signup",
    component: Signup,
  },
  {
    path: '/postSingle/:id',
    name: "PostSingle",
    component: PostSingle,
  },
  {
    path: '/profile',
    name: "Profile",
    component: Profile,
  },
  {
    path: '/users',
    name: "Users",
    component: Users,
  }
]

// Formate URL
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;



