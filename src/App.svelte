<script lang="ts">
  import KingdomRoller from "./rollers/KingdomRoller.svelte";
  import RegionRoller from "./rollers/RegionRoller.svelte";
  import PlaceRoller from "./rollers/PlaceRoller.svelte";
  import FollowerRoller from "./rollers/FollowerRoller.svelte";
  import Footer from "./componenets/Footer.svelte";
</script>

<main>
  <h1>The Perilous Wilds</h1>
  <h2>A web-app for rolling on tables and getting funny results</h2>
  <hr />
  <KingdomRoller />
  <hr />
  <RegionRoller />
  <hr />
  <PlaceRoller />
  <hr />
  <FollowerRoller />
  <hr />
  <Footer />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
