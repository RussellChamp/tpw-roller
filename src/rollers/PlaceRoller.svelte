<script lang="ts">
  import { places } from "./data";
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { bodgeString } from "./utils";

  export let rollResults: { value: string; timestamp: string }[] = [];

  function addResult(result: string) {
    rollResults = [{ value: result, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }

  function roll(event: Event) {
    let template = _.sample(places.templates);

    addResult(bodgeString(template, places));
  }
</script>

<main>
  <h1>Random Places</h1>
  <button type="button" class="btn btn-primary" on:click={roll}>Roll Region</button>

  {#each rollResults as result}
    <h3>{result.timestamp}: {result.value}</h3>
  {/each}
</main>

<style>
</style>
