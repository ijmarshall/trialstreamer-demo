<template>
<div class="search">
  <b-alert show variant="warning" dismissible fade>
    <strong>Please note</strong>: this site is an early release and in active development.
      <br>
      We are making frequent changes to the annotations. Please see the <a href="about/">About page</a> for some important information about interpreting the results.
  </b-alert>

  <vue-tags-input
    v-model="tag"
    :tags="tags"
    :autocomplete-items="autocompleteItems"
    :add-only-from-autocomplete="true"
    placeholder="Start typing a Population, Intervention, Comparator, or Outcome (PICO)"
    @tags-changed="update"
    style="max-width: none;"
    />
  <div class="loading">
    <b-spinner
      v-if="loading"
      small
      label="Loading"
      variant="secondary"/>
  </div>
  <b-alert v-if="error" show dismissible variant="danger" style="margin-top: 1em">
    {{error}}
  </b-alert>
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
      debounce: null,
      loading: false,
      error: null
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoadingArticles;
    }
  },
  watch: {
    tag: "initItems",
    $route(to) {
      this.$store.commit("loadingArticles", true);
      let tags = JSURL.parse(to.query.q) || [];
      if(tags !== this.tags || !tags.length) {
        this.tags = tags.map((item) => ({
          classes: item.field,
          text: item.text,
          cui: item.cui,
        }));
        this.$store.commit("updateTags", this.tags);
      }
      if(tags.length) {
        this.fetch(tags);
      } else {
        this.$store.commit("updateArticles", []); 
      }
    }
  },
  beforeMount() {
    this.$store.commit("updateArticles", []);
    let tags = JSURL.parse(this.$route.query.q);
    if(tags && tags.length) {
      this.$store.commit("updateTags", tags);
      this.tags = tags.map((item) => ({
        classes: item.field,
        text: item.text,
        cui: item.cui,
      }));
      this.fetch(tags);
    }
  },
  methods: {
    fetch(tags) {
      this.$store.commit("loadingArticles", true);
      let self = this;
      const url = `${process.env.VUE_APP_SERVER_URL}/picosearch`;
      axios
        .post(
          url,
          { terms: tags },
          { headers: { "api-key": process.env.VUE_APP_API_KEY } }
        )
        .then((response) => {
          this.$store.commit("updateArticles", response.data);
        })
        .catch(function (e) {
          self.error = e.toString();
          console.error(e.stack);
        })
        .finally(function() {
          self.$store.commit("loadingArticles", false);
        });
    },
    update(newTags) {
      this.autocompleteItems = [];
      let tags = newTags.map((item) => ({
        field: item.classes,
        text: item.text,
        cui: item.cui,
      }));

      this.$router.push({ name: 'search', query: { q: JSURL.stringify(tags) }});
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `${process.env.VUE_APP_SERVER_URL}/autocomplete?q=${this.tag.toLowerCase()}`;
      clearTimeout(this.debounce);
      this.loading = true;
      let self = this;
      this.debounce = setTimeout(() => {
        axios
          .get(url, { headers: { "api-key": process.env.VUE_APP_API_KEY } })
          .then((response) => {
            this.autocompleteItems = response.data.map((item) => ({
              classes: item.field,
              text: item.cui_pico_display,
              cui: item.cui,
            }));
          })
          .catch(function(e) {
            self.error = e.toString();
            console.error(e.stack);
          })
          .finally(() => this.loading = false);
      }, 125);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loading {
  position: absolute;
  right: 1em;
  top: 5px;
  opacity: 0.5;

}
.search {
  position: relative;
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
