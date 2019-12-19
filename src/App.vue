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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
