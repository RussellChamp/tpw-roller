<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollSteading } from "../rollers/steadings";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let steading = rollSteading();
    dispatch("roll", { type: "steading", value: steading });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Steading</Button>
</main>

<style>
</style>
