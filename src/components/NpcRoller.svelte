<script lang="ts">
  import { Button } from "sveltestrap";
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";

  import NpcCard from "./NpcCard.svelte";
  import { Npc, rollNpc } from "../rollers/npcs";

  const dispatch = createEventDispatcher();

  export let rollResults: { npc: Npc; timestamp: string }[] = [];

  function roll(event: Event) {
    let npc = rollNpc();
    rollResults = [{ npc, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Npc</Button>
  </span>

  {#each rollResults as { npc, timestamp }}
    <NpcCard {npc} {timestamp} />
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
