<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { Button, Icon } from "sveltestrap";
  import { Danger, rollDanger } from "../rollers/dangers";

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
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Danger</Button>
  </span>

  {#each rollResults as { danger, icon, timestamp }}
    <h4>
      {timestamp}: {danger.category} ({danger.subcategory}) <Icon name={icon} />: {danger.description}
    </h4>
  {/each}
</main>

<style>
</style>
