<template>
  <div class="search">
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      :add-only-from-autocomplete="true"
      placeholder="Start typing MeSH term..."
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
        const url = `${process.env.VUE_APP_SERVER_URL}/picosearch`;
        axios.post(url, {terms: newTags.map(item => ({field: item.classes, mesh_ui: item.mesh_ui}))}, {headers: {'api-key':process.env.VUE_APP_API_KEY}}).then(response => {
        this.$store.commit('updateArticles', response.data);

      }).catch(() => console.warn("The query didn't work"));
    },
    initItems() {
      if (this.tag.length < 2) return;
        const url = `${process.env.VUE_APP_SERVER_URL}/autocomplete?q=${this.tag}`;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
          axios.get(url, {headers: {"api-key": process.env.VUE_APP_API_KEY}}).then(response => {
              this.autocompleteItems = response.data.map(item => ({classes: item.field, text: item.mesh_pico_display, mesh_ui: item.mesh_ui}));
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
