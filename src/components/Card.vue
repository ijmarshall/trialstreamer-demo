<template>
  <b-card
    v-bind:title="item.ti"
    class="result-card shadow-sm p-3 mb-5 bg-white rounded">

    <div
      v-if="item.num_randomized"
      class="num-randomized"
      v-b-tooltip.hover.right
      title="Number of participants randomized, extracted using machine learning">
      n={{ item.num_randomized }}
    </div>

    <div
      v-if="item.target_size"
      class="num-randomized"
      v-b-tooltip.hover.right
      title="Target size of the trial, extracted using machine learning">
      n={{ item.target_size }}
    </div>


    <h6 class="card-subtitle text-muted mb-2" v-if="item.article_type == 'preprint' ||  item.article_type == 'journal article'">
      <a
        v-bind:href="`https://www.ncbi.nlm.nih.gov/pubmed/${item.pmid}`"
        target="_blank">{{ item.pmid }}</a>
      {{ item.citation }}
      <a
        v-if="item.dois && item.dois[0]"
        v-bind:href="`https://dx.doi.org/${item.dois[0]}`"
        target="_blank">{{ item.dois[0] }}</a>
    </h6>

    <h6 class="card-subtitle text-muted mb-2" v-else>
      {{item.regid}}, {{item.is_recruiting}}, {{item.is_rct}}
    </h6>


    <b-card-text>
      <span v-if="item.countries && item.countries.length">
        <strong>Date Registered:</strong> {{registered_date}}
        <br />
        <strong>Study Countries:</strong> {{ item.countries.join(", ") }}
        <br />
      </span>

      <span v-if="item.punchline_text && item.punchline_text.length">
        {{ item.punchline_text }}
        <br />
      </span>

      <b-container style="margin: 1em -15px 0 -15px;">
        <b-row>
          <b-col>
            <b-badge class="population-badge dim-badge">Population</b-badge>
            <ul>
              <li v-for="p in distinct(item.population)" :key="p">
                {{ fixParens(p) }}
              </li>
              <li v-if="!item.population.length">
                <em>None extracted</em>
              </li>
            </ul>
          </b-col>

          <b-col>
            <b-badge class="intervention-badge dim-badge">Interventions</b-badge>
            <ul>
              <li v-for="i in distinct(item.interventions)" :key="i">
                {{ fixParens(i) }}
              </li>
              <li v-if="!item.interventions.length">
                <em>None extracted</em>
              </li>
            </ul>
          </b-col>

          <b-col>
            <b-badge class="outcome-badge dim-badge">Outcomes</b-badge>
            <ul>
              <li v-for="o in distinct(item.outcomes)" :key="o">
                {{ fixParens(o) }}
              </li>
              <li v-if="!item.outcomes.length">
                <em>None extracted</em>
              </li>
            </ul>
          </b-col>
        </b-row>
        <div
          class="risk-of-bias"
          v-b-tooltip.hover.right
          title="As determined by RobotReviewer based on the abstract text">
          <div>
            <span>Allocation concealment: </span>
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
</template>


<script>
export default {
  name: "Card",
  props: ['item'],
  computed: {
    registered_date: function() {
      return window.moment(this.item.date_registered).format("LL")
    }
  },
  methods: {
   // https://stackoverflow.com/questions/26586753/javascript-add-missing-parentheses-in-string
    _fixParens: function(s, left, right) {
      var missedOpen = 0, missedClosed = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] == left) {
          missedClosed++;
        } else if (s[i] == right) {
          if (missedClosed > 0)
            missedClosed--;
          else
            missedOpen++;
        }
      }
      return Array(missedOpen + 1).join(left) + s + Array(missedClosed + 1).join(right);
    },
    fixParens: function(s) {
      let a = this._fixParens(s,"(", ")");
      let b = this._fixParens(a,"[","]");
      return b;
    },
    distinct: function (strs) {
      let d = new Map(strs.map((s) => [s.toLowerCase(), s]));
      return [...d.values()];
    }
  }
}
</script>

<style scoped>
.result-card {
  margin-top: 0;
  text-align: left;
}
.result-card,
.result-card * {
  transition: all 0.125s ease !important;
}
.result-card .dim-badge {
  transition: initial;
}
.result-card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
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
  color: #212529;
  background-color: #dae0e5;
  position: absolute;
  right: 0;
  top: 0;
  min-width: 3em;
  text-align: center;
  padding: 0 1em;
  border-bottom-left-radius: 0.25rem;
  font-size: 75%;
}
.risk-of-bias {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 0.5em 0.5em 0.5em;
  color: var(--gray);
  text-align: right;
  border-top-left-radius: 0.25rem;
  font-size: 75%;
}
.risk-of-bias > div {
  display: inline-block;
  margin-left: 1em;
}
.risk-of-bias > div span:first-child {
  font-weight: bolder;
}
.result-card:hover .risk-of-bias span[data-bias="l"] {
  color: var(--green);
}
</style>
