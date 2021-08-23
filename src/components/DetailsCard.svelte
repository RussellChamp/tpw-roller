<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import { Detail, rollDetail } from "../rollers/details";
  import DieIcon from "./DieIcon.svelte";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let detail: Detail;
  export let timestamp: string;

  function reroll() {
    detail = rollDetail(detail.type);
    dispatch("rerolled", new RerolledEvent("detail-" + detail.type, detail));
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
          <div class="description">
            Detail: {capitalize(detail.type)}
          </div>
          <CardButtons data={detail} dataType={"detail-" + detail.type} on:reroll={reroll} on:remove={remove} />
        </div></CardTitle
      >
    </CardHeader>
    <CardBody>
      <CardText>
        {detail.description}<DieIcon value={detail.roll} />
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
