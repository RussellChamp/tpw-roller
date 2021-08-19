<script lang="ts">
  import { Button } from "sveltestrap";
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";
  import DiscoveryCard from "./DiscoveryCard.svelte";
  import { Discovery, rollDiscovery } from "../rollers/discoveries";

  const dispatch = createEventDispatcher();

  export let rollResults: { discovery: Discovery; timestamp: string }[] = [];

  function roll(event: Event) {
    let discovery = rollDiscovery();
    rollResults = [{ discovery, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }

  function getIcon(t: string, c: string): string {
    return "";
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Discovery</Button>
  </span>

  {#each rollResults as { discovery, timestamp }}
    <DiscoveryCard {discovery} {timestamp} />
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
