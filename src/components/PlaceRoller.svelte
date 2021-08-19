<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollPlace } from "../rollers/places";

  const dispatch = createEventDispatcher();

  export let rollResults: { place: string; timestamp: string }[] = [];

  function roll(event: Event) {
    let place = rollPlace();
    rollResults = [{ place, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Place</Button>
  </span>

  {#each rollResults as { place, timestamp }}
    <h4>{timestamp}: {place}</h4>
  {/each}
</main>

<style>
</style>
