<script lang="ts">
  import { Accordion, AccordionHeader, AccordionItem } from "sveltestrap";

  import SoundOptions from "./components/SoundOptions.svelte";
  import CreatureRoller from "./components/CreatureRoller.svelte";
  import DangerRoller from "./components/DangerRoller.svelte";
  import DetailsRoller from "./components/DetailsRoller.svelte";
  import DiscoveryRoller from "./components/DiscoveryRoller.svelte";
  import DungeonRoller from "./components/DungeonRoller.svelte";
  import FollowerRoller from "./components/FollowerRoller.svelte";
  import KingdomRoller from "./components/KingdomRoller.svelte";
  import NpcRoller from "./components/NpcRoller.svelte";
  import PlaceRoller from "./components/PlaceRoller.svelte";
  import RegionRoller from "./components/RegionRoller.svelte";
  import SteadingRoller from "./components/SteadingRoller.svelte";
  import Footer from "./components/Footer.svelte";

  let rollThemBones = new Audio("https://soundbible.com/mp3/Shake And Roll Dice-SoundBible.com-591494296.mp3");
  let playSounds = true;

  function setSoundOptions(event: any) {
    playSounds = event.detail.soundEnabled;
  }

  function roll(event: any) {
    // console.log("called roll with", details);
    rollThemBones.pause();
    rollThemBones.currentTime = 0;
    if (playSounds) {
      rollThemBones.play();
    }
  }
</script>

<main>
  <h1>The Perilous Wilds</h1>
  <h2>A web-app for rolling on tables and getting funny results</h2>
  <hr />
  <SoundOptions on:soundToggle={setSoundOptions} />
  <hr />
  <Accordion>
    <AccordionItem active header="Creatures">
      <CreatureRoller on:makeSomeNoise={roll} />
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
    <AccordionItem header="Steadings">
      <SteadingRoller />
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
