import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
// import './plugins/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import App from './App.vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    tags: [],
    pageNo: 1,
    articles: []
  },
  mutations: {
    updateTags (state, new_tags) {
      state.tags = new_tags;
      state.pageNo = 1;
    },
    increasePage (state) {
      state.pageNo += 1;
    },
    decreasePage (state) {
      state.pageNo -= 1;
    },
    updateArticles (state, new_articles) {
      state.articles = new_articles
    }
  },
  getters: {
    getTags(state) {
      return state.tags;
    },
    getArticles(state) {
      return state.articles;
    }
  },
})


new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
