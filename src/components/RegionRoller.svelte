<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollRegion } from "../rollers/regions";

  const dispatch = createEventDispatcher();

  export let rollResults: { region: string; timestamp: string }[] = [];

  function roll(event: Event) {
    let region = rollRegion();
    rollResults = [{ region, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Region</Button>
  </span>

  {#each rollResults as { region, timestamp }}
    <h4>{timestamp}: {region}</h4>
  {/each}
</main>

<style>
</style>
