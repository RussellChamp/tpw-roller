<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { Accordion, AccordionHeader, AccordionItem, Container, Row, Col } from "sveltestrap";

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
  import MultiCard from "./components/MultiCard.svelte";
  import { RollCard } from "./types/RollCard";

  let rollThemBones = new Audio("https://soundbible.com/mp3/Shake And Roll Dice-SoundBible.com-591494296.mp3");
  let playSounds = localStorage?.getItem("playSounds") != "false";
  let timeout: NodeJS.Timeout;
  let cards: RollCard[] = [];

  function setSoundOptions(event: CustomEvent<{ soundEnabled: boolean }>) {
    playSounds = event.detail.soundEnabled;
    localStorage?.setItem("playSounds", String(playSounds));
  }

  function handleRoll(event: CustomEvent<{ type: string; value: any }>) {
    let timestamp = formatDate(new Date(), "P kk:mm:ss");
    cards = [new RollCard(event?.detail?.type, event?.detail?.value, timestamp), ...cards];
    playAudio();
  }

  function playAudio() {
    clearTimeout(timeout);
    rollThemBones.pause();
    rollThemBones.currentTime = 0;

    if (playSounds) {
      rollThemBones.volume = 0.6 + 0.4 * Math.random(); // vary the volume
      rollThemBones.playbackRate = 0.6 + 0.8 * Math.random(); // vary the playback rate
      rollThemBones.play();

      let playTime = rollThemBones.duration * 1000 * (0.3 + 0.7 * Math.random()); // vary the playback duration
      // console.log(`rolling die at volume ${rollThemBones.volume}, playbackRate ${rollThemBones.playbackRate}, play duration ${playTime}`);
      timeout = setTimeout(() => {
        rollThemBones.pause();
      }, playTime);
    }
  }

  function remove(event: CustomEvent<RollCard>) {
    cards = cards.filter((c) => c.timestamp != event.detail.timestamp);
  }
</script>

<main>
  <Container fluid={true}>
    <Row>
      <h1>The Perilous Wilds</h1>
      <h2>A web-app for rolling on tables and getting funny results</h2>
      <hr />
    </Row>
    <Row>
      <Col sm="3">
        <div class="sidebar">
          <h3>Rollers:</h3>
          <hr />
          <CreatureRoller on:roll={handleRoll} />
          <DangerRoller on:roll={handleRoll} />
          <DiscoveryRoller on:roll={handleRoll} />
          <DungeonRoller on:roll={handleRoll} />
          <FollowerRoller on:roll={handleRoll} />
          <NpcRoller on:roll={handleRoll} />
          <PlaceRoller on:roll={handleRoll} />
          <RegionRoller on:roll={handleRoll} />
          <SteadingRoller on:roll={handleRoll} />

          <h3>Kingdom:</h3>
          <KingdomRoller on:roll={handleRoll} />

          <h3>Details:</h3>
          <DetailsRoller on:roll={handleRoll} />

          <hr />

          <h3>Options</h3>
          <SoundOptions soundEnabled={playSounds} on:soundToggle={setSoundOptions} />
        </div>
      </Col>
      <Col sm="9">
        <h3>Results:</h3>
        {#each cards as card}
          <MultiCard {card} on:remove={remove} />
        {/each}
      </Col>
    </Row>
    <Row>
      <Footer />
    </Row>
  </Container>
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

  .sidebar {
    background-color: rgba(0, 0, 0, 0.03);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
