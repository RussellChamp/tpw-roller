<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { Button } from "sveltestrap";
  import SteadingCard from "./SteadingCard.svelte";
  import { rollSteading, Steading } from "../rollers/steadings";

  export let rollResults: { steading: Steading; timestamp: string }[] = [];

  function roll(event: Event) {
    let steading = rollSteading();
    rollResults = [{ steading, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Steading</Button>
  </span>

  {#each rollResults as { steading, timestamp }}
    <SteadingCard {steading} {timestamp} />
  {/each}
</main>

<style>
</style>
