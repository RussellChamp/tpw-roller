<script lang="ts">
  import { capitalize } from "lodash";
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";

  import { KingdomItem, kingdoms, rollCategory } from "../rollers/kingdoms";

  const dispatch = createEventDispatcher();

  let kingdom = "arpad";
  let categories: string[];

  function roll(category: string) {
    let value = rollCategory(kingdom, category);

    dispatch("roll", { type: "kingdom", value: new KingdomItem(kingdoms[kingdom], category, value) });
  }

  $: categories = kingdoms[kingdom].categories;
</script>

<main>
  <select bind:value={kingdom}>
    {#each Object.keys(kingdoms) as k}
      <option value={k}>{kingdoms[k].description}</option>
    {/each}
  </select>

  <div>{kingdoms[kingdom].subtitle}</div>

  {#each categories as category}
    <Button color="primary" on:click={() => roll(category)}>Roll {capitalize(category)}</Button>
  {/each}
</main>

<style>
  select {
    font-size: 0.8em;
  }
</style>
