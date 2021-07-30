<script lang="ts">
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { Discovery, rollDiscovery } from "./discoveries";

  export let rollResults: { value: Discovery; timestamp: string }[] = [];

  function roll(event: Event) {
    rollResults = [{ value: rollDiscovery(), timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <h2>Random Discovery</h2>
  <button type="button" class="btn btn-primary" on:click={roll}>Roll Discovery</button>

  {#each rollResults as result}
    <h4>
      {result.timestamp}: {result.value.category} ({result.value.subcategory}): {result.value.description}
    </h4>
  {/each}
</main>

<style>
</style>
