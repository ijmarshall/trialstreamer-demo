<template>
  <div class="results">
    <div
      v-if="getLoadingArticles"
      class="d-flex justify-content-center"
      style="margin-top: 4rem;">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <div v-if="sortedArticles.length > 0">
        <p style="font-size: small; text-align: right;">
          Showing <span v-if="isTruncated">first 250 results only</span>
          <span v-else>{{ rows }} results</span>
        </p>
        <b-button-toolbar class="justify-content-end">
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
        <div v-if="showExamples">
          <strong>No results</strong>
        </div>
        <div v-else>
          <Examples />
        </div>
      </div>
    </div>
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
    rows() {
      return this.$store.getters.getArticles.length;
    },
    getLoadingArticles() {
      return this.$store.getters.getLoadingArticles;
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
      return this.$store.getters.getArticles;
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
      let result = this.$store.getters.getArticles.slice().sort(sortFn);
      return getPaginatedItems(result, this.currentPage, this.perPage);
    },
  },
};
</script>

<style scoped>
.results {
  margin-bottom: 2em;
}
.result-cards {
  margin-top: 2em;
}

</style>
