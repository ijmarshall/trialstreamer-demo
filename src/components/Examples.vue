<template>
<div>
  Example <router-link :to="{path: '/', query: {q: example1}}">Hey</router-link>
</div>
</template>


<script>
import JSURL from "jsurl";

export default {
  data() {
    return {
      example1: JSURL.stringify([{"field":"population", "text": "COVID19", "mesh_ui":"C000657245"}])
  }
},
name: "Examples",
components: {},
};

</script>

<style scoped>
</style>
