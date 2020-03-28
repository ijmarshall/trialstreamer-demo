<template>
  <div class="search">
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      :add-only-from-autocomplete="true"
      placeholder="Start typing MeSH terms..."
      @tags-changed="update"
      debounce="500"
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
      autocompleteItems: []
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
      this.$store.commit('loadingArticles', true);

      const url = `${process.env.VUE_APP_SERVER_URL}/picosearch`;
      axios.post(url, {terms: newTags.map(item => ({field: item.classes, mesh_ui: item.mesh_ui}))}, {headers: {'api-key':process.env.VUE_APP_API_KEY}}).then(response => {
        this.$store.commit('updateArticles', response.data);
        this.$store.commit('loadingArticles', false);

      }).catch(function() { console.warn("The query didn't work"); this.$store.commit('loadingArticles', false); });
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `${process.env.VUE_APP_SERVER_URL}/autocomplete?q=${this.tag}`;
          axios.get(url, {headers: {"api-key": process.env.VUE_APP_API_KEY}}).then(response => {
              this.autocompleteItems = response.data.map(item => ({classes: item.field, text: item.mesh_pico_display, mesh_ui: item.mesh_ui}));
        }).catch(() => console.warn('Oh. Something went wrong'));
    },
  }
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.search {
  margin: 0 auto;
}

.search .vue-tags-input {
  max-width: none;
  width: 100%;
}

.vue-tags-input .ti-tag.population {
  background: var(--population-background);
}

.vue-tags-input .ti-tag.interventions {
  background: var(--intervention-background);
  color: var(--intervention-color);
}

.vue-tags-input .ti-tag.outcomes {
  background: var(--outcome-background);
}


</style>
