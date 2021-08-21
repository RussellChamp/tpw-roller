<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollPlace } from "../rollers/places";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let place = rollPlace();
    dispatch("roll", { type: "place", value: place });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Place</Button>
</main>

<style>
</style>
