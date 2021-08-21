<script lang="ts">
  import { Button } from "sveltestrap";
  import { createEventDispatcher } from "svelte";
  import { rollDiscovery } from "../rollers/discoveries";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let discovery = rollDiscovery();
    dispatch("roll", { type: "discovery", value: discovery });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Discovery</Button>
</main>

<style>
</style>
