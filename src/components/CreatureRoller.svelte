<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { Button } from "sveltestrap";
  import CreatureCard from "./CreatureCard.svelte";
  import { Creature, rollCreature } from "../rollers/creatures";

  let rollResults: { creature: Creature; timestamp: string }[] = [];

  function roll(event: Event) {
    let creature = rollCreature();
    rollResults = [{ creature, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Creature</Button>

  {#each rollResults as { creature, timestamp }}
    <CreatureCard {creature} {timestamp} />
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
</style>
