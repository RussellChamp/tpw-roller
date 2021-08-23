<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import type { Place } from "../rollers/places";
  import { rollPlace } from "../rollers/places";
  import { RerolledEvent } from "../types/RerolledEvent";
  import CardButtons from "./CardTitleButtons.svelte";

  const dispatch = createEventDispatcher();
  export let place: Place;
  export let timestamp: string;

  function reroll() {
    place = rollPlace();
    dispatch("rerolled", new RerolledEvent("place", place));
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
          <div class="description">Place</div>
          <CardButtons data={place} dataType="place" on:reroll={reroll} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        Name: {place}
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
