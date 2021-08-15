<script lang="ts">
  import { capitalize } from "lodash";
  import { format as formatDate } from "date-fns";
  import { Button, Icon } from "sveltestrap";

  import { kingdoms, rollCategory } from "../rollers/kingdoms";

  let rollResults: { value: string; icon: string; timestamp: string }[] = [];
  let kingdom = "arpad";
  let categories: string[];

  function roll(category: string) {
    let value = rollCategory(kingdom, category);

    let icon = { male: "person-fill", female: "person", steading: "house-door-fill", mount: "bicycle" }[category] || "";
    rollResults = [{ value, icon, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
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
      <Button color="primary" on:click={() => roll(category)}>Roll {capitalize(category)}</Button>
    </span>
  {/each}

  {#each rollResults as { value, icon, timestamp }}
    <h4>{timestamp}: <Icon name={icon} /> {value}</h4>
  {/each}
</main>

<style>
</style>
