<template>
  <b-container fluid="xs"  class="shadow-sm p-4 bg-white rounded">
    <h1>What is Trialstreamer?</h1>

    <p>Randomized controlled trials (RCTs) are the most reliable way to determine whether treatments in healthcare work or not. But there are hundreds of thousands of these studies, with more published every day. Keeping abreast of this vast volume is now impossible for health professionals. Even professional reviewers of research and information specialists can take weeks or even years to evaluate the evidence for a treatment.</p>

    <p>To address this need, we have developed Trialstreamer, which is an evidence surveillance system powered by artificial intelligence (AI). We continuously scan key sources of research (PubMed, and the WHO International Clinical Trials Registry Platform [ICTRP]), and use our RobotReviewer machine learning system to automatically find the RCTs, and extract key pieces of information from them. </p>




    <h1>People</h1>

    <p>Trialstreamer is made by the international academic collaboration behind <a href="https://robotreviewer.net">RobotReviewer</a>. The research is jointly led by Iain Marshall (King's College London) and Byron Wallace (Northeastern University), with critical contributions from Joël Kuiper (Vortext Systems, Netherlands), Ben Nye (Northeastern), and Frank Soboczenski (King's).</p>

    <p>There are very many other collaborators and graduate students who contribute to the effort. We acknowledge in particular Ani Nenkova and Zachary Ives (UPenn), Tom Trikalinos and team (Brown), James Thomas (EPPI Centre, UCL), Anna Noel-Storr (University of Oxford and Cochrane Dementia), Rachel Marshall (Cochrane), Regina Barzilay (MIT), Eric Lehman (Northeastern), Jay DeYoung (Northeastern), Gert van Valkenhoef (Cochrane), Randolph Bias (University of Texas at Austin).</p>

    <p>We are enormously grateful for the support of very many people and groups who have generously allowed us use of their data to train and evaluate our systems. In particular, we would like to express our gratitude to Cochrane. We are hugely appreciative to the volunteers and team behind the Cochrane Crowd, whose efforts and data were fundamental to creating our RCT detection system.</p>


    <h1>Research behind Trialstreamer</h1>

    <p>We have published a <a href="https://www.ncbi.nlm.nih.gov/pubmed/?term=marshall+i%5Bauthor%5D+wallace+b%5Bauthor%5D">number of scientific articles</a> describing the RobotReviewer system, which powers Trialstreamer.</p>

    <p>We provided an overview of the system for a research audience in <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5662138/">our ACL paper, available freely here</a>.

    <p>We are currently preparing a journal manuscript describing how the full Trialstreamer system works, and with an evaluation of its accuracy.</p>


    <h1>Funding</h1>

    <p>We are funded by the UK Medical Research Council (MRC), through its Skills Development Fellowship program (MR/N015185/1), and the US National Institutes of Health (NIH) under the National Library of Medicine (grant R01-LM012086-01A1, "Semi-Automating Data Extraction for Systematic Reviews"). Wallace is also supported in this work through an NSF CAREER award (1750978, "CAREER: Structured Scientific Evidence Extraction: Models and Corpora").</p>

    <p>Prior support came from NIH grant 5UH2CA203711-02, "Crowdsourcing Mark-up of the Medical Literature to Support Evidence-Based Medicine and Develop Automated Annotation Capabilities".</p>







  </b-container>

</template>


<script>
export default {
  name: "About",
  components: {}
};

</script>

<style scoped>
</style>
