<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter, Icon } from "sveltestrap";

  import { Danger, rollDanger } from "../rollers/dangers";
  import CreatureCard from "./CreatureCard.svelte";
  import DieIcon from "./DieIcon.svelte";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let danger: Danger;
  export let timestamp: string;

  function reroll() {
    danger = rollDanger();
    dispatch("rerolled", new RerolledEvent("danger", danger));
  }

  function remove() {
    dispatch("remove");
  }

  function rerolledCreature(event: CustomEvent<RerolledEvent>) {
    danger.creature = event.detail.value;
    dispatch("rerolled", new RerolledEvent("danger", danger));
  }

  let icon = "";
  $: icon =
    danger.category == "unnatural entity"
      ? "person-square"
      : danger.category == "hazard"
      ? "lightning-fill"
      : danger.category == "creature"
      ? "emoji-neutral"
      : "";
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        <div class="title">
          <div class="description">
            {capitalize(danger.category)}<DieIcon value={danger.roll} />
            {#if danger.subcategory !== ""}({danger.subcategory})<DieIcon value={danger.subroll} />{/if}: {capitalize(
              danger.description
            )}<DieIcon value={danger.specificroll} />
          </div>
          <CardButtons data={danger} dataType="danger" on:reroll={reroll} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Icon name={icon} />: {danger.description}
        {#if danger.creature}
          <CreatureCard creature={danger.creature} on:rerolled={rerolledCreature} showRemove={false} />
        {/if}
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
