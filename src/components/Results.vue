<template>
  <div class="results">    
    <div v-if="getNumResults>0">
      <p>{{ getNumResults }} articles found</p>
     <b-button>Download all</b-button>
     <b-button v-bind:disabled="disableButtonBack" v-on:click="page_i -= 1">back</b-button>
     {{page_i + 1}} of {{page_max +1}}
     <b-button v-bind:disabled="disableButtonForward" v-on:click="page_i += 1">forward</b-button>
    </div>
    <table>
      <tr v-for="item in viewableItems"  v-bind:key="item"><td>{{ item.pmid }}</td>  <td>{{ item.ti }}</td> </tr>
    </table>
  </div>
</template>

<script>



export default {
  name: 'Results',
  props: {

  },
  methods: {
  },
  data: function () {
      return {
        page_i: 0,
        page_len: 10,
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
      return (this.resultStartI==0);
    },
    disableButtonForward() {
      return (this.resultEndI>=this.getNumResults);
    },
    viewableItems() {
      return this.getArticles.slice(this.resultStartI, this.resultEndI);
    },
    getNumResults() {
      return this.$store.getters.getArticles.length;
    },
    page_max() {
        return Math.floor(this.getNumResults/this.page_len) + 1;
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
      return this.$store.getters.getArticles;
    }
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
