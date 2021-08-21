<script lang="ts">
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter } from "sveltestrap";
  import type { Region } from "../rollers/regions";

  export let region: Region;
  export let timestamp: string;
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>Region</CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        {region}
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
</style>
