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
      style="max-width: none;"
    />
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "axios";
import JSURL from "jsurl";
export default {
  name: "SearchBox",
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: "",
      tags: [],
      autocompleteItems: [],
    };
  },
  watch: {
    tag: "initItems",
    $route(to) {
      const tags = JSURL.parse(to.query.q);
      if(tags !== this.tags) {
        this.tags = tags.map((item) => ({
          classes: item.field,
          text: item.text,
          mesh_ui: item.mesh_ui,
        }));
        this.$store.commit("updateTags", this.tags);
      }
      this.fetch(tags);
    }
  },
  beforeMount() {
    let tags = JSURL.parse(this.$route.query.q);
    if(tags && tags.length) {
      this.$store.commit("updateTags", tags);
      this.$store.commit("loadingArticles", true);
      this.tags = tags.map((item) => ({
        classes: item.field,
        text: item.text,
        mesh_ui: item.mesh_ui,
      }));

      this.fetch(tags);
     }
  },
  methods: {
    fetch(tags) {
      let self = this;

      const url = `${process.env.VUE_APP_SERVER_URL}/picosearch`;
      axios
        .post(
          url,
          {
            terms: tags
          },
          { headers: { "api-key": process.env.VUE_APP_API_KEY } }
        )
        .then((response) => {
          this.$store.commit("updateArticles", response.data);
          this.$store.commit("loadingArticles", false);
        })
        .catch(function () {
          console.warn("The query didn't work");
          self.$store.commit("loadingArticles", false);
        });
    },
    update(newTags) {
      this.autocompleteItems = [];
      let tags = newTags.map((item) => ({
        field: item.classes,
        text: item.text,
        mesh_ui: item.mesh_ui,
      }))

      this.$router.push({ name: 'search', query: { q: JSURL.stringify(tags) }});
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `${process.env.VUE_APP_SERVER_URL}/autocomplete?q=${this.tag}`;
      axios
        .get(url, { headers: { "api-key": process.env.VUE_APP_API_KEY } })
        .then((response) => {
          this.autocompleteItems = response.data.map((item) => ({
            classes: item.field,
            text: item.mesh_pico_display,
            mesh_ui: item.mesh_ui,
          }));
        })
        .catch(() => console.warn("Oh. Something went wrong"));
    },
  },
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
