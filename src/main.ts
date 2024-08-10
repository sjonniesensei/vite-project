import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import App from './App.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import Home from './components/Home.vue'
import Search from './components/Search.vue'
import Upload from './components/Upload.vue'
import Challenges from './components/Challenges.vue'
import Profile from './components/Profile.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/search', component: Search },
    { path: '/upload', component: Upload },
    { path: '/challenges', component: Challenges },
    { path: '/profile', component: Profile },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
  ],
})

const app = createApp(App)
  .use(IonicVue)
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})
