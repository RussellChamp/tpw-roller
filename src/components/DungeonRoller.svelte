<script lang="ts">
  import { Button } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  import { rollDungeon } from "../rollers/dungeons";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let dungeon = rollDungeon();
    dispatch("roll", { type: "dungeon", value: dungeon });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Dungeon</Button>
</main>

<style>
</style>
