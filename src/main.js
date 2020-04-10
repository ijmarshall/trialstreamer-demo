import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import VueRouter from 'vue-router'

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// import './plugins/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import App from './App.vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueLodash, { lodash: lodash })
Vue.use(VueRouter)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    loading_articles: true,
    tags: [],
    articles: []
  },
  mutations: {
    updateTags (state, new_tags) {
      state.tags = new_tags;
    },
    updateArticles (state, new_articles) {
      state.articles = new_articles;
    },
    loadingArticles (state, loading) {
      state.loading_articles = loading;
    }
  },
  getters: {
    getTags(state) {
      return state.tags;
    },
    getArticles(state) {
      return state.articles;
    },
    getLoadingArticles(state) {
      return state.loading_articles;
    }
  },
})

import About from "./pages/About.vue";
import Search from "./pages/Search.vue";
import ShowStudy from "./pages/ShowStudy.vue";


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Search, name: 'search'},
  { path: '/about', component: About, name: 'about' },
  { path: '/showstudy/:studyid', component: ShowStudy, name: 'showstudy'}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
