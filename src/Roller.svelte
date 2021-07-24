<script lang="ts">
  import { kingdoms } from "./data";
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";

  export let rollResults: { value: string; timestamp: string }[] = [];
  let kingdom = "arpad";
  let category = "male";
  let categories: string[];
  let values: string[];

  function addResult(result: string) {
    rollResults = [{ value: result, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }

  function rollName(event: Event) {
    addResult(_.sample(values));
  }

  $: categories = kingdoms[kingdom].categories;
  $: values = kingdoms[kingdom][category];
</script>

<main>
  <h1>
    <select bind:value={kingdom}>
      {#each Object.keys(kingdoms) as k}
        <option value={k}>{kingdoms[k].description}</option>
      {/each}
    </select>
  </h1>
  <h2>{kingdoms[kingdom].subtitle}</h2>
  <hr />

  <select bind:value={category}>
    {#each categories as c}
      <option value={c}>{_.capitalize(c)}</option>
    {/each}
  </select>
  <button type="button" class="btn btn-primary" on:click={rollName}>Roll {_.capitalize(category)}</button>
  {#each rollResults as result}
    <h3>{result.timestamp}: {result.value}</h3>
  {/each}
</main>

<style>
</style>
