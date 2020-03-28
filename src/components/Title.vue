<template>
  <div class="Header">
    <h1>Trialstreamer</h1>
    <p>
      A living, annotated database of {{stats.num_rcts}} randomized controlled trials.
      <span>Last updated {{ago}}</span>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Title',
  data() {
    return {stats: {num_rcts: "...", last_updated: null}};
  },
  props: {},
  beforeMount(){
    this.getStats()
  },
  methods: {
    getStats: function() {
      axios({
        url: `${process.env.VUE_APP_SERVER_URL}/meta`,
        method: 'GET',
        headers: {
          'api-key': process.env.VUE_APP_API_KEY
        }
      }).then((response) => {
        this.stats = response.data
      });
    },
  },
  computed: {
    ago: function() {
      if(this.stats.last_updated) {
      return window.moment(this.stats.last_updated).fromNow();
      } else {
        return "...";
      }
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
