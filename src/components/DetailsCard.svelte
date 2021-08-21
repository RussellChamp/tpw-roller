<script lang="ts">
  import { capitalize } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import type { Detail } from "../rollers/details";
  import DieIcon from "./DieIcon.svelte";

  export let detail: Detail;
  export let timestamp: string;
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        {capitalize(detail.type)}
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        {detail.description}<DieIcon value={detail.roll} />
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
</style>
