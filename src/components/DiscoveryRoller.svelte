<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";
  import { format as formatDate } from "date-fns";
  import DiscoveryCard from "./DiscoveryCard.svelte";
  import { Discovery, rollDiscovery } from "../rollers/discoveries";

  export let rollResults: { discovery: Discovery; timestamp: string }[] = [];

  function roll(event: Event) {
    let discovery = rollDiscovery();

    rollResults = [{ discovery, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
  function getIcon(t: string, c: string): string {
    return "";
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Discovery</Button>
  </span>

  {#each rollResults as { discovery, timestamp }}
    <DiscoveryCard {discovery} {timestamp} />
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
  .btn {
    text-align: center;
  }
</style>
