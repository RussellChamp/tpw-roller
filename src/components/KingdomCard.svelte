<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize, sample } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter, Icon } from "sveltestrap";
  import type { KingdomItem } from "../rollers/kingdoms";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let item: KingdomItem;
  export let timestamp: string;
  let icon = "";

  function reroll() {
    item.description = sample(item.kingdom[item.category]);
    dispatch("rerolled", new RerolledEvent("kingdomItem-" + item.category, item.description));
  }

  function remove() {
    dispatch("remove");
  }

  $: icon = String({ male: "person-fill", female: "person", steading: "house-door-fill", mount: "bicycle" }[item?.category] || "");
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        <div class="title">
          <div class="description">
            {capitalize(item.category)} from {item.kingdom.description}
          </div>
          <CardButtons data={item.description} dataType={"kingdomItem." + item?.category} on:reroll={reroll} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        Name: <Icon name={icon} />
        {item.description}
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
