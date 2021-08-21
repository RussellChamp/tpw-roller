<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollRegion } from "../rollers/regions";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let region = rollRegion();
    dispatch("roll", { type: "region", value: region });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Region</Button>
</main>

<style>
</style>
