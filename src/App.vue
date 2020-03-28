<template>
  <div id="app">
    <Title/>
    <SearchBox/>
    <Results/>
  </div>
</template>

<script>
  import Title from './components/Title.vue'
  import SearchBox from './components/SearchBox.vue'
  import Results from './components/Results.vue'
  export default {
  name: 'app',
  components: {
  Title,
  SearchBox,
  Results,
  }
  }
</script>

<style>
:root {
  --population-background: #003f5c;
  --intervention-background: #ffa600;
  --intervention-color: #000000;
  --outcome-background: #bc5090;
}
body {
  max-width: 60vw;
  margin: 0 auto !important;
}
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
