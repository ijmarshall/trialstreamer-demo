<template>
  <div>
    <SearchBox />
    <Results />
  </div>
</template>


<script>
import SearchBox from "../components/SearchBox.vue";
import Results from "../components/Results.vue";


export default {
  name: "Search",
  components: {
    SearchBox,
    Results,
  }
};

</script>

<style scoped>
</style>
