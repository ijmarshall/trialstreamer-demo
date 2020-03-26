<template>
  <div class="results">
    <div v-if="getTags.length>0">
      <div class="results-nav">
      <p>{{ getNumResults }} articles found</p>
      <b-button v-bind:disabled="getNumResults==0" v-on:click="download"><b-icon icon="cloud-download"></b-icon></b-button>
      <b-button variant="info" v-bind:disabled="disableButtonBack" v-on:click="decreasePage"><b-icon icon="arrow-left"></b-icon></b-button>
     {{page_i}} of {{page_max}}
      <b-button variant="info" v-bind:disabled="disableButtonForward" v-on:click="increasePage"><b-icon icon="arrow-right"></b-icon></b-button>
   </div>
        <b-table striped hover :items="getArticles" :fields="fields" :sort-by.sync="sortBy" :sort-desc=true :per-page="page_len" :current-page="page_i">
              <template v-slot:cell(pmid_link)="data">
                  <a v-bind:href="`https://www.ncbi.nlm.nih.gov/pubmed/${data.item.pmid}`" target="_blank">{{data.item.pmid}}</a>
              </template>

              <template v-slot:cell(ti_punchline)="data">
                  <h5>{{ data.item.ti }}</h5>
                  <p>{{ data.item.punchline_text }}</p>                  
              </template>

        
        </b-table>
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
        url: `${process.env.VUE_APP_SERVER_URL}/picosearch`,
      method: 'POST',
      data: {terms: this.getTags.map(item => ({field: item.classes, mesh_ui: item.mesh_ui})), retmode: 'ris'},
      responseType: 'blob',
      headers: {'api-key': process.env.VUE_APP_API_KEY}}
    ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'trialstreamer.ris');
  document.body.appendChild(link);
      link.click();
});
    },
        increasePage: function() {
            this.$store.commit("increasePage");
        },
        decreasePage: function() {
            this.$store.commit("decreasePage");
        },
  },
  data: function () {
      return {
        page_len: 10,
        sortBy: 'year',
        fields: [
          {key: "pmid_link", label: "PubMed link"},
          {key: "ti_punchline", label: "Title", sortable: false},
          {key: "year", label: "Year", sortable: true},
          ],
      }

    },
  computed: {
    page_i() {
        return this.$store.getters.getPage;
    },
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
      return (this.page_i>=this.page_max);
    },
    getNumResults() {
      return this.$store.getters.getArticles.length;
    },
    page_max() {
        return Math.ceil(this.getNumResults/this.page_len);
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
        return this.$store.getters.getArticles;
    },

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.results {
  text-align: left;
}

.results-nav {
  text-align: center;
}


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
