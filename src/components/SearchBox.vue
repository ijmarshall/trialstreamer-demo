<template>
  <div class="search">
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      :add-only-from-autocomplete="true"
      @tags-changed="update"
      />
  </div>

</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import axios from 'axios';

export default {
    name: 'SearchBox',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
    };
  },
  watch: {
    'tag': 'initItems',
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
      this.$store.commit('updateTags', newTags);
      const url = `http://localhost:5000/pico_mesh_query`;
      axios.post(url, newTags).then(response => {
        this.$store.commit('updateArticles', response.data);

      }).catch(() => console.warn("The query didn't work"));
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `http://localhost:5000/pico_term_lookup?q=${this.tag}`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios.get(url).then(response => {
          this.autocompleteItems = response.data;
        }).catch(() => console.warn('Oh. Something went wrong'));
      }, 600);
    },
  },
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.search {
    width: 50%;
    margin: 0 auto;
}

.search .vue-tags-input {
  max-width: none;
  width: 100%;
}

  .vue-tags-input .ti-tag.population{
    background: #003f5c;
  }

  .vue-tags-input .ti-tag.interventions{
    background: #ffa600;
    color: #000000;
  }

  .vue-tags-input .ti-tag.outcomes{
    background: #bc5090;
  }


</style>
