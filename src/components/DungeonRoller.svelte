<script lang="ts">
  import { Button } from "sveltestrap";
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";

  import DungeonCard from "./DungeonCard.svelte";
  import { Dungeon, rollDungeon } from "../rollers/dungeons";

  const dispatch = createEventDispatcher();

  export let rollResults: { dungeon: Dungeon; timestamp: string }[] = [];

  function roll(event: Event) {
    let dungeon = rollDungeon();
    rollResults = [{ dungeon, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Dungeon</Button>
  </span>

  {#each rollResults as { dungeon, timestamp }}
    <DungeonCard {dungeon} {timestamp} />
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
  .btn {
    text-align: center;
  }
</style>
