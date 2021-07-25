<script lang="ts">
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { Button, Icon } from "sveltestrap";

  import { kingdoms } from "./data";

  let rollResults: { value: string; icon: string; timestamp: string }[] = [];
  let kingdom = "arpad";
  let categories: string[];

  function addResult(value: string, category: string) {
    let icon = { male: "person-fill", female: "person", steading: "house-door-fill", mount: "bicycle" }[category] || "";
    rollResults = [{ value, icon, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }

  function rollName(category: string) {
    let values = kingdoms[kingdom][category];

    addResult(_.sample(values), category);
  }

  $: categories = kingdoms[kingdom].categories;
</script>

<main>
  <h2>
    <select bind:value={kingdom}>
      {#each Object.keys(kingdoms) as k}
        <option value={k}>{kingdoms[k].description}</option>
      {/each}
    </select>
  </h2>
  <h3>{kingdoms[kingdom].subtitle}</h3>

  {#each categories as category}
    <span class="btn">
      <Button color="primary" on:click={() => rollName(category)}>Roll {_.capitalize(category)}</Button>
    </span>
  {/each}

  {#each rollResults as result}
    <h4>{result.timestamp}: <Icon name={result.icon} /> {result.value}</h4>
  {/each}
</main>

<style>
</style>
