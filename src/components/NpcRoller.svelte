<script lang="ts">
  import { Button } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  import { rollNpc } from "../rollers/npcs";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let npc = rollNpc();
    dispatch("roll", { type: "npc", value: npc });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Npc</Button>
</main>

<style>
</style>
