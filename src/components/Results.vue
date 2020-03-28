<template>
<div class="results">
  <div v-if="getLoadingArticles" class="d-flex justify-content-center" style="margin-top: 4rem">
    <b-spinner type="grow" label="Loading..."></b-spinner>
  </div>
  <div v-if="getTags.length > 0">
    <p style="font-size: small; text-align: right">
      Showing <span v-if="isTruncated">first 250 results only</span><span v-else>{{numResults}} results</span></p>
    <b-button-toolbar class="justify-content-end" >
      <b-button-group>
        <b-form-radio-group
          v-model="newestFirst"
          :options="sortOptions"
          button-variant="light"
          size="sm"
          buttons
          name="radios-btn-default"></b-form-radio-group>
        <b-button v-bind:disabled="numResults==0" v-on:click="download"  size="sm" v-b-tooltip.hover  title="Download citations">
          <b-icon icon="cloud-download"></b-icon></b-button>
      </b-button-group>
    </b-button-toolbar>
    <div v-for="item in sortedArticles" :key="item.pmid" class="result-cards">
      <b-card v-bind:title="item.ti" class="result-card shadow-sm p-3 mb-5 bg-white rounded">
        <div v-if="item.num_randomized" class="num-randomized" v-b-tooltip.hover.right title="Number of participants randomized, extracted using machine learning">
          n={{item.num_randomized}}
        </div>
        <h6 class="card-subtitle text-muted mb-2">
          <a v-bind:href="`https://www.ncbi.nlm.nih.gov/pubmed/${item.pmid}`" target="_blank">{{item.pmid}} ({{(item.year).toString()}})</a>
        </h6>
        <b-card-text>
          <span v-if="item.punchline_text.length">
            {{item.punchline_text}}
            <br />
          </span>

          <b-container style="margin: 1em -15px 0 -15px">
            <b-row>
              <b-col>
                <b-badge class="population-badge dim-badge">Population</b-badge>
                <ul>
                  <li v-for="p in distinct(item.population)" :key="p">
                    {{ p }}
                  </li>
                  <li v-if="!item.population.length"><em>None extracted</em></li>
                </ul>
              </b-col>

              <b-col>
                <b-badge class="intervention-badge dim-badge">Interventions</b-badge>
                <ul>
                  <li v-for="i in distinct(item.interventions)" :key="i">
                    {{ i }}
                  </li>
                  <li v-if="!item.interventions.length"><em>None extracted</em></li>
                </ul>
              </b-col>

              <b-col>
                <b-badge class="outcome-badge dim-badge">Outcomes</b-badge>
                <ul>
                  <li v-for="o in distinct(item.outcomes)" :key="o">
                    {{ o }}
                  </li>
                  <li v-if="!item.outcomes.length"><em>None extracted</em></li>
                </ul>
              </b-col>
            </b-row>
            <div class="risk-of-bias" v-b-tooltip.hover.right title="As determined by RobotReviewer based on the abstract text">
              <div><span>Allocation concealment: </span>
                <span v-bind:data-bias="item.low_ac_bias ? 'l' : 'h'">{{item.low_ac_bias ? "low" : "high/unknown"}}</span>
              </div>
              <div>
                <span>Blinding of participants and personnel: </span>
                <span v-bind:data-bias="item.low_bpp_bias ? 'l' : 'h'">{{item.low_bpp_bias ? "low" : "high/unknown"}}</span>
              </div>
              <div>
                <span>Random sequence generation: </span>
                <span v-bind:data-bias="item.low_rcg_bias ? 'l' : 'h'">{{item.low_rcg_bias ? "low" : "high/unknown"}}</span>
              </div>
            </div>

          </b-container>


        </b-card-text>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Results',
  data() {
    return {
      newestFirst: true,
      sortOptions: [{
        text: 'Newest first',
        value: true
      }, {
        text: 'Oldest first',
        value: false
      }]
    }
  },
  props: {

  },
  methods: {
    distinct: function(strs) {
      let d = new Map(strs.map(s => [s.toLowerCase(), s]));
      return [...d.values()];
    },
    download: function() {
      axios({
        url: `${process.env.VUE_APP_SERVER_URL}/picosearch`,
        method: 'POST',
        data: {
          terms: this.getTags.map(item => ({
            field: item.classes,
            mesh_ui: item.mesh_ui
          })),
          retmode: 'ris'
        },
        responseType: 'blob',
        headers: {
          'api-key': process.env.VUE_APP_API_KEY
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'trialstreamer.ris');
        document.body.appendChild(link);
        link.click();
      });
    },
  },
  computed: {
    numResults() {
      return this.$store.getters.getArticles.length;
    },
    getLoadingArticles() {
      return this.$store.getters.getLoadingArticles;
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getArticles() {
      return this.$store.getters.getArticles;
    },
    isTruncated() {
      return this.$store.getters.getArticles.length >= 250;
    },
    sortedArticles() {
      let newest = this.newestFirst;
      let sortFn = function(a, b) {
        if (newest) {
          return b.year - a.year;
        } else {
          return a.year - b.year;
        }
      }
      return this.$store.getters.getArticles.slice().sort(sortFn);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  margin-bottom: 2em;
}
.result-cards {
  margin-top: 2em;
}
.result-card {
  margin-top: 0;
  text-align: left;
}
.result-card, .result-card * {
  transition: all 0.125s ease !important;
}
.result-card .dim-badge {
  transition: initial;
}
.result-card:hover {
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
}
.result-card:not(:hover) .dim-badge {
  color: #212529;
  background-color: #dae0e5;

}
.result-card:hover .num-randomized {
  background-color: var(--info);
  color: white;
}
.result-card:not(:hover) a {
  color: var(--dark);
}
.result-card:hover .risk-of-bias {
  color: #212529;
  background-color: #dae0e5;
}

.intervention-badge {
  background-color: var(--intervention-background);
}
.outcome-badge {
  background-color: var(--outcome-background);
}
.population-badge {
  background-color: var(--population-background);
}

.num-randomized {
  cursor: pointer;
  color: #212529;
  background-color: #dae0e5;
  position: absolute;
  right: 0;
  top: 0;
  min-width: 3em;
  text-align: center;
  padding: 0 1em;
  border-bottom-left-radius: .25rem;
  font-size: 75%;
}
.risk-of-bias {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 0.5em 0.5em 0.5em;
  color: var(--gray);
  text-align: right;
  border-top-left-radius: .25rem;
  font-size: 75%;
}
.risk-of-bias > div {
  display: inline-block;
  margin-left: 1em;
}
.risk-of-bias > div span:first-child {
  font-weight: bolder;
}
.result-card:hover .risk-of-bias span[data-bias ='l'] {
  color: var(--green);
}
</style>
