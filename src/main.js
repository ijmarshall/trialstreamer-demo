import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

Vue.use(Vuex)
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    tags: [],
    articles: []
  },
  mutations: {
    updateTags (state, new_tags) {
      state.tags = new_tags
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
