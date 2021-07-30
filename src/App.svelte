<script lang="ts">
  import CreatureRoller from "./rollers/CreatureRoller.svelte";
  import KingdomRoller from "./rollers/KingdomRoller.svelte";
  import RegionRoller from "./rollers/RegionRoller.svelte";
  import PlaceRoller from "./rollers/PlaceRoller.svelte";
  import DangerRoller from "./rollers/DangerRoller.svelte";
  import DiscoveryRoller from "./rollers/DiscoveryRoller.svelte";
  import FollowerRoller from "./rollers/FollowerRoller.svelte";
  import DetailsRoller from "./rollers/DetailsRoller.svelte";
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
  <DangerRoller />
  <hr />
  <DiscoveryRoller />
  <hr />
  <CreatureRoller />
  <hr />
  <FollowerRoller />
  <hr />
  <DetailsRoller />
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
