<script lang="ts">
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { regions } from "./regions";
  import { bodgeString } from "./utils";

  export let rollResults: { value: string; timestamp: string }[] = [];

  function addResult(result: string) {
    rollResults = [{ value: result, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }

  function roll(event: Event) {
    let template = _.sample(regions.templates);

    addResult(bodgeString(template, regions));
  }
</script>

<main>
  <h2>Random Regions</h2>
  <button type="button" class="btn btn-primary" on:click={roll}>Roll Region</button>

  {#each rollResults as result}
    <h4>{result.timestamp}: {result.value}</h4>
  {/each}
</main>

<style>
</style>
