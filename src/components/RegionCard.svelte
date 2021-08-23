<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import type { Region } from "../rollers/regions";
  import { rollRegion } from "../rollers/regions";
  import { RerolledEvent } from "../types/RerolledEvent";
  import CardButtons from "./CardTitleButtons.svelte";

  const dispatch = createEventDispatcher();
  export let region: Region;
  export let timestamp: string;

  function reroll() {
    region = rollRegion();
    dispatch("rerolled", new RerolledEvent("region", region));
  }

  function remove() {
    dispatch("remove");
  }
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        <div class="title">
          <div class="description">Region</div>
          <CardButtons data={region} dataType="region" on:reroll={reroll} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        Name: {region}
      </CardText>
    </CardBody>
    {#if timestamp}
      <CardFooter>{timestamp}</CardFooter>
    {/if}
  </Card>
</main>

<style>
  main {
    text-align: left;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
</style>
