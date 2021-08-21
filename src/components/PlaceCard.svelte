<script lang="ts">
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import type { Place } from "../rollers/places";

  export let place: Place;
  export let timestamp: string;
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>Place</CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        {place}
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
</style>
