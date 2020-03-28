import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
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

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    loading_articles: false,
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


new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
