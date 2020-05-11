<template>
<b-container class="shadow-sm p-3 mb-5 bg-white rounded well">
  <b-row>
    <b-col>
      <p class=" lead" >Try some of these examples:</p>
      <ul>
        <li><router-link :to="{path: '/', query: {q: example1}}">What is the effect of remdesivir for treating COVID-19?</router-link></li>
        <li><router-link :to="{path: '/', query: {q: example2}}">What is the best ventilation strategy for acute respiratory distress syndrome (ARDS)?</router-link></li>
        <li><router-link :to="{path: '/', query: {q: example3}}">Do chloroquine or hydroxychloroquine improve outcomes in COVID-19 infection?</router-link></li>
        <li><router-link :to="{path: '/', query: {q: example4}}">What trials are underway on the use of Extracorporeal Membrane Oxygenation (ECMO) in COVID-19?</router-link></li>
      </ul>
    <b-container>
        <p class="lead">Open access:</p>
        <ul>
            <li>Daily data updates freely available at <a href="https://doi.org/10.5281/zenodo.3767068">Zenodo <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.3767068.svg" alt="DOI"></a></li>
            <li>Source code available for <a href="https://github.com/ijmarshall/robotreviewer">RobotReviewer</a>, <a href="https://github.com/ijmarshall/trialstreamer">the Trialstreamer database</a>, and <a href="https://github.com/ijmarshall/trialstreamer-demo">this demonstration website</a>.</li>
        </ul>
    </b-container>
      <b-container>
        <b-row>
          <b-col  xs="1" md="3">
            <p class="lead">A collaboration between:</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col  xs="1" md="3">
            <b-link href="https://www.kcl.ac.uk/">
              <b-img thumbnail fluid width="250px" src="@/assets/kings.jpg" alt="King's College London"></b-img>
            </b-link>
          </b-col>
          <b-col  xs="1" md="3">
            <b-link href="https://www.northeastern.edu/">
              <b-img thumbnail fluid width="250px" src="@/assets/northeastern.png" alt="Northeastern University"></b-img>
            </b-link>
          </b-col>
          <b-col  xs="1" md="3">
            <b-link href="https://vortext.systems/">
              <b-img thumbnail fluid width="250px" src="@/assets/vortext.png" alt="Vortext Systems"></b-img>
            </b-link>
          </b-col>
          <b-col  xs="1" md="3">
            <b-link href="https://www.robotreviewer.net/">
              <b-img thumbnail fluid width="250px" src="@/assets/logo.svg" alt="powered by RobotReviewer"></b-img>
            </b-link>
          </b-col>
        </b-row>
      </b-container>
    </b-col>
  </b-row>
</b-container>
</template>


<script>
import JSURL from "jsurl";

export default {
  data() {
    return {
      example1: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "cui":"TS-COV19"}, {"field": "interventions", "text": "Remdesivir [interventions]", "cui": "C4726677"}]),
      example2: JSURL.stringify([{"field":"population", "text": "Acute Respiratory Distress Syndrome [population]", "cui":"C0035222"}, {"field": "interventions", "text": "Ventilation [interventions]", "cui": "C0554804"}]),
      example3: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "cui":"TS-COV19"}, {"field": "interventions", "text": "Chloroquine [interventions]", "cui": "C0008269"}]),
      example4: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "cui":"TS-COV19"}, {"field": "interventions", "text": "Extracorporeal Membrane Oxygenation (ECMO) [interventions]", "cui": "C0015357"}]),




  }
},
name: "Examples",
components: {},
};

</script>

<style scoped>
  .well {
  margin-top: 1em;

  }
</style>
