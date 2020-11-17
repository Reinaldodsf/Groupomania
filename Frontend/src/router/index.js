import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Feed from '../components/Feed.vue'
import Post from '../components/Post.vue'
import Administration from '../components/Administration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Home/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/Home/Feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/Home/Feed/Post',
    name: 'Post',
    component: Post
  },
  {
    path: '/Home/Admi',
    name: 'Administration',
    component: Administration
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
