<script lang="ts">
  import { Accordion, AccordionHeader, AccordionItem } from "sveltestrap";
  import CreatureRoller from "./rollers/CreatureRoller.svelte";
  import DangerRoller from "./rollers/DangerRoller.svelte";
  import DetailsRoller from "./rollers/DetailsRoller.svelte";
  import DiscoveryRoller from "./rollers/DiscoveryRoller.svelte";
  import DungeonRoller from "./rollers/DungeonRoller.svelte";
  import FollowerRoller from "./rollers/FollowerRoller.svelte";
  import KingdomRoller from "./rollers/KingdomRoller.svelte";
  import NpcRoller from "./rollers/NpcRoller.svelte";
  import PlaceRoller from "./rollers/PlaceRoller.svelte";
  import RegionRoller from "./rollers/RegionRoller.svelte";
  import Footer from "./componenets/Footer.svelte";
</script>

<main>
  <h1>The Perilous Wilds</h1>
  <h2>A web-app for rolling on tables and getting funny results</h2>
  <hr />
  <Accordion>
    <AccordionItem active header="Creatures">
      <CreatureRoller />
    </AccordionItem>
    <AccordionItem header="Dangers">
      <DangerRoller />
    </AccordionItem>
    <AccordionItem header="Details">
      <DetailsRoller />
    </AccordionItem>
    <AccordionItem header="Discoveries">
      <DiscoveryRoller />
    </AccordionItem>
    <AccordionItem header="Dungeons">
      <DungeonRoller />
    </AccordionItem>
    <AccordionItem header="Followers">
      <FollowerRoller />
    </AccordionItem>
    <AccordionItem header="Kingdoms">
      <KingdomRoller />
    </AccordionItem>
    <AccordionItem header="NPCs">
      <NpcRoller />
    </AccordionItem>
    <AccordionItem header="Places">
      <PlaceRoller />
    </AccordionItem>
    <AccordionItem header="Regions">
      <RegionRoller />
    </AccordionItem>
  </Accordion>
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
