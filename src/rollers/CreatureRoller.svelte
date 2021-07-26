<script lang="ts">
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { Creature, rollCreature } from "./creatures";

  export let rollResults: { value: Creature; timestamp: string }[] = [];

  function roll(event: Event) {
    let value = rollCreature();
    console.log("creature", value);

    rollResults = [{ value, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <h2>Random Creatures</h2>
  <button type="button" class="btn btn-primary" on:click={roll}>Roll Creature</button>

  {#each rollResults as result}
    <h4>{result.timestamp}: {result.value.description}</h4>
  {/each}
</main>

<style>
</style>
