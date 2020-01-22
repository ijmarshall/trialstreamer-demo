<template>
  <div class="results">
    <div v-if="getTags.length>0">
      <p>{{ getNumResults }} articles found</p>
      <b-button v-bind:disabled="getNumResults==0" v-on:click="download"><b-icon icon="cloud-download"></b-icon></b-button>
     <b-button variant="info" v-bind:disabled="disableButtonBack" v-on:click="page_i -= 1"><b-icon icon="arrow-left"></b-icon></b-button>
     {{page_i}} of {{page_max}}
     <b-button variant="info" v-bind:disabled="disableButtonForward" v-on:click="page_i += 1"><b-icon icon="arrow-right"></b-icon></b-button>
        <b-table striped hover :items="getArticles" :fields="fields" :sort-by.sync="sortBy" :sort-desc=true :per-page="page_len" :current-page="page_i"></b-table>
    </div>

        <!--    <b-table-simple>
      <b-thead>
        <b-tr><b-th>PubMed ID</b-th><b-th>Title</b-th></b-tr>
      </b-thead>
        <b-tr v-for="item in viewableItems"  v-bind:key="item.pmid"><b-td>{{ item.pmid }}</b-td>  <b-td>{{ item.ti }}</b-td> </b-tr>
        </b-table-simple>-->
  </div>
</template>

<script>


import axios from 'axios';

export default {
  name: 'Results',
  props: {

  },
  methods: {
    download: function() {
    axios({
      url: 'http://localhost:5000/picosearch',
      method: 'POST',
      data: {terms: this.getTags.map(item => ({field: item.classes, mesh_ui: item.mesh_ui})), retmode: 'ris'},
      responseType: 'blob',
      headers: {'api-key': 'ZJ5J6mlWocHma4t9uun6MEDlRQaWtke#'}}
    ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'trialstreamer.ris');
  document.body.appendChild(link);
      link.click();
});
    }
  },
  data: function () {
      return {
        page_i: 1,
        page_len: 10,
        sortBy: 'year',
        fields: [
          {key: "pmid", sortable: true},
          {key: "ti", sortable: false},
          {key: "year", sortable: true}
          ],
      }

    },
  computed: {
    resultStartI() {
      return this.page_i * this.page_len;
    },
    resultEndI() {
      return Math.min(this.resultStartI + this.page_len, this.getNumResults);
    },
    disableButtonBack() {
      return (this.page_i==1);
    },
    disableButtonForward() {
      return (this.resultEndI>=this.getNumResults);
    },
    getNumResults() {
      return this.$store.getters.getArticles.length;
    },
    page_max() {
        return Math.floor(this.getNumResults/this.page_len);
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
      return this.$store.getters.getArticles;
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
