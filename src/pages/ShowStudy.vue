<template>
  <div>
    <!-- <SearchBox /> -->
    <Results />

  </div>
</template>


<script>
// import SearchBox from "../components/SearchBox.vue"; 
import axios from "axios";
import Results from "../components/Results.vue";


export default {
  name: "ShowStudy",
  components: {
    Results,
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoadingArticles;
    }
  },
  mounted: function() {
    const self = this
    this.$nextTick(function() {
      const url = `${process.env.VUE_APP_SERVER_URL}/show_trial/${this.$route.params.studyid}`;
      //alert(this.$route.params.study_id);
      //alert(url)
      axios
        .get(
          url,
          { headers: { "api-key": process.env.VUE_APP_API_KEY } }
        )
        .then((response) => {
          //alert(response.data);
          // byron: the response here is good (so far as I can tell),
          // but I cannot work out how to get the Results
          // component to update, mostly because I have no idea 
          // what I'm doing. 
          self.$store.commit("updateArticles", response.data);
        })
        .finally(function() {
          self.$store.commit("loadingArticles", false);
        })
    });
  }


};

</script>

<style scoped>
</style>
