<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import { rollCreature } from "../rollers/creatures";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let creature = rollCreature();
    dispatch("roll", { type: "creature", value: creature });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Creature</Button>
</main>

<style>
</style>
