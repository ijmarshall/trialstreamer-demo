<template>
<div>
  <p>or try some of these examples:</p>
  <ul>
      <li><router-link :to="{path: '/', query: {q: example1}}">What are the effects of antivirals for treating COVID-19?</router-link></li>
      <li><router-link :to="{path: '/', query: {q: example2}}">What is the best ventilation strategy for acute respiratory distress syndrome (ARDS)?</router-link></li>
      <li><router-link :to="{path: '/', query: {q: example3}}">Do chloroquine or hydroxychloroquine improve outcomes in COVID-19 infection?</router-link></li>
      <li><router-link :to="{path: '/', query: {q: example4}}">What trials are underway on the use of Extracorporeal Membrane Oxygenation (ECMO) in COVID-19?</router-link></li>
    </ul>

    <b-container fluid class="p-4">
      <b-row>A collaboration between:</b-row>
        <b-row>
          <b-col>
            <b-img thumbnail fluid width="250px" src="@/assets/kings.jpg" alt="King's College London"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid width="250px" src="@/assets/northeastern.png" alt="Northeastern University"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid width="250px" src="@/assets/vortext.png" alt="Vortext Systems"></b-img>
          </b-col>
          <b-col>
            <b-img thumbnail fluid width="250px" src="@/assets/logo.svg" alt="powered by RobotReviewer"></b-img>
          </b-col>

  </b-row>
</b-container>
</div>
</template>


<script>
import JSURL from "jsurl";

export default {
  data() {
    return {
      example1: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "mesh_ui":"C000657245"}, {"field": "interventions", "text": "Antiviral agents [interventions]", "mesh_ui": "D000998"}]),
      example2: JSURL.stringify([{"field":"population", "text": "Acute Respiratory Distress Syndrome [population]", "mesh_ui":"D012128"}, {"field": "interventions", "text": "Ventilation [interventions]", "mesh_ui": "D014691"}]),
      example3: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "mesh_ui":"C000657245"}, {"field": "interventions", "text": "Chloroquine [interventions]", "mesh_ui": "D002738"}]),
      example4: JSURL.stringify([{"field":"population", "text": "COVID-19 [population]", "mesh_ui":"C000657245"}, {"field": "interventions", "text": "Extracorporeal Membrane Oxygenation (ECMO) [interventions]", "mesh_ui": "D015199"}]),

      

      
  }
},
name: "Examples",
components: {},
};

</script>

<style scoped>
</style>
