<script lang="ts">
  import { capitalize } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter, Icon } from "sveltestrap";
  import type { Danger } from "../rollers/dangers";
  import DieIcon from "./DieIcon.svelte";

  export let danger: Danger;
  export let timestamp: string;

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
        {capitalize(danger.category)}<DieIcon value={danger.roll} />
        {#if danger.subcategory !== ""}({danger.subcategory})<DieIcon value={danger.subroll} />{/if}: {capitalize(
          danger.description
        )}<DieIcon value={danger.specificroll} />
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Icon name={icon} />: {danger.description}
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
</style>
