<template>
  <div class="results">    
    <table>
        <tr v-for="item in getArticles"  v-bind:key="item"><td>{{ item.pmid }}</td>  <td>{{ item.ti }}</td> </tr>
    </table>
  </div>
</template>

<script>



export default {
  name: 'Results',
  props: {

  },
    data: function () {
        return {
    items: [
      { pmid: '128575', ti: "Here is a title", num_randomized:20 },
      { pmid: '122355', ti: "Here is another title", num_randomized:86 },
    ]
    }
    },
  computed: {
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
