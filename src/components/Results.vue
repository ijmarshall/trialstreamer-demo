<template>
<div class="results">
  <transition name="fade" mode="out-in">
    <div v-if="getLoadingArticles"
         key="loading"
         class="d-flex justify-content-center"
         style="margin-top: 4rem; z-index:100">
      <b-img src="@/assets/loading.gif" style="opacity: 0.20; width: 33%; filter: blur(1px)" />
    </div>
    <div v-else key="results">
      <div v-if="sortedArticles.length > 0" >
        <p style="font-size: small; text-align: right;">
          <b-icon-exclamation-triangle v-if="isTruncated" />
          Showing <span v-if="isTruncated">first 250 results only</span>
          <span v-else>{{ rows }} results</span>
        </p>
        <div class="d-flex">
          <b-button-toolbar
            style="margin-bottom: 2em"
            class="mr-auto p-2"
            >
            <b-button-group>
              <b-form-radio-group
                v-model="filterType"
                name="radios-btn-component"
                button-variant="light"
                size="sm"
                buttons>
                <b-form-radio value="all">All ({{ rowsAll }})</b-form-radio>
                <b-form-radio value="journal article" :disabled="rowsPublications==0">Published articles ({{ rowsPublications }})</b-form-radio>
                <b-form-radio value="preprint" :disabled="rowsPreprints==0">Preprints ({{ rowsPreprints }})</b-form-radio>
                <b-form-radio value="trial registration" :disabled="rowsTrialRegistrations==0">Registered trials ({{ rowsTrialRegistrations}})</b-form-radio>
              </b-form-radio-group>
            </b-button-group>
          </b-button-toolbar>
          <b-button-toolbar
            style="margin-bottom: 2em"
            class="p-2">
            <b-button-group>
              <b-form-radio-group
                v-model="newestFirst"
                :options="sortOptions"
                button-variant="light"
                size="sm"
                buttons
                name="radios-btn-default">
              </b-form-radio-group>
              <b-button
                v-bind:disabled="rows == 0"
                v-on:click="download"
                size="sm"
                v-b-tooltip.hover
                title="Download citations">
                <b-icon icon="cloud-download"></b-icon>
              </b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>

        <Card
          v-for="item in sortedArticles"
          :key="item.pmid"
          v-bind:item="item"
          class="result-cards">
        </Card>

        <div class="d-flex justify-content-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"></b-pagination>
        </div>
      </div>
      <div v-else class="result-cards">
        <div v-if="showExamples" style="text-align: center; margin-top: 2em">
          <strong>No results</strong>
      </div>
      <div v-else>
        <Examples />
      </div>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
import axios from "axios";
import Examples from "./Examples.vue";
import Card from "./Card.vue";

function getPaginatedItems(items, page, pageSize) {
  var pg = page || 1,
      pgSize = pageSize || 100,
      offset = (pg - 1) * pgSize,
      pagedItems = window._.drop(items, offset).slice(0, pgSize);
  return pagedItems;
}

export default {
  name: "Results",
  components: { Examples, Card },
  data() {
    return {
      perPage: 25,
      currentPage: 1,
      newestFirst: true,
      filterType: 'all',
      sortOptions: [
        {
          text: "Newest first",
          value: true,
        },
        {
          text: "Oldest first",
          value: false,
        },
      ],
    };
  },
  props: {},
  watch: {
    getArticles(to, from) {
      if(!this._.isEqual(to, from)) {
        this.currentPage = 1;
      }
    }
  },
  methods: {
     download: function () {
      axios({
        url: `${process.env.VUE_APP_SERVER_URL}/picosearch`,
        method: "POST",
        data: {
          terms: this.getTags.map((item) => ({
            field: item.classes,
            mesh_ui: item.mesh_ui,
          })),
          retmode: "ris",
        },
        responseType: "blob",
        headers: {
          "api-key": process.env.VUE_APP_API_KEY,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "trialstreamer.ris");
        document.body.appendChild(link);
        link.click();
      });
    },
  },
  computed: {
    rowsAll() {
      return this.$store.getters.getArticles.length;
    },
    rows() {
      return this.getArticles.length;
    },
    rowsPublications() {
      return this.$store.getters.getArticles.filter(function(el) {return el.article_type=='journal article'}).length;
    },
    rowsPreprints() {
      return this.$store.getters.getArticles.filter(function(el) {return el.article_type=='preprint'}).length;
    },
    rowsTrialRegistrations() {
      return this.$store.getters.getArticles.filter(function(el) {return el.article_type=='trial registration'}).length;
    },
    getLoadingArticles() {
      return this.$store.getters.getLoadingArticles;
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
      let filterType = this.filterType;
      // return this.$store.getters.getArticles.filter(function(el) {return el.article_type==filterType}).length;
      if (this.filterType=='all') {
        return this.$store.getters.getArticles;
      } else {
        return this.$store.getters.getArticles.filter(function(el) {return el.article_type==filterType});
      }
    },
    isTruncated() {
      return this.$store.getters.getArticles.length >= 250;
    },
    showExamples() {
      return !!this.$store.getters.getTags.length;
    },
    sortedArticles() {
      let newest = this.newestFirst;
      let sortFn = function (a, b) {
        if (newest) {
          return b.year - a.year;
        } else {
          return a.year - b.year;
        }
      };
      let result = this.getArticles.slice().sort(sortFn);
      return getPaginatedItems(result, this.currentPage, this.perPage);
    },
  },
};
</script>

<style scoped>
.results {
  margin-bottom: 2em;
}
.results .results-card:first-child {
  margin-top: 2em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .125s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
