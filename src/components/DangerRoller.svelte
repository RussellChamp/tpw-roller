<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollDanger } from "../rollers/dangers";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let danger = rollDanger();
    dispatch("roll", { type: "danger", value: danger });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Danger</Button>
</main>

<style>
</style>
