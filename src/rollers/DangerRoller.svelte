<script lang="ts">
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { Icon } from "sveltestrap";
  import { Danger, rollDanger } from "./dangers";

  export let rollResults: { danger: Danger; icon: string; timestamp: string }[] = [];

  function roll(event: Event) {
    let danger = rollDanger();
    let icon =
      danger.category == "unnatural entity"
        ? "person-square"
        : danger.category == "hazard"
        ? "lightning-fill"
        : danger.category == "creature"
        ? "emoji-neutral"
        : "";
    rollResults = [{ danger, icon, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <h2>Random Danger</h2>
  <button type="button" class="btn btn-primary" on:click={roll}>Roll Danger</button>

  {#each rollResults as result}
    <h4>
      {result.timestamp}: {result.danger.category} ({result.danger.subcategory}) <Icon name={result.icon} />: {result.danger.description}
    </h4>
  {/each}
</main>

<style>
</style>
