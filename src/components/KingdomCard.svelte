<script lang="ts">
  import { capitalize } from "lodash";
  import { Card, CardHeader, CardTitle, CardBody, CardText, CardFooter, Icon } from "sveltestrap";
  import type { Kingdom, KingdomItem } from "../rollers/kingdoms";

  export let item: KingdomItem;
  export let timestamp: string;
  let icon = "";

  $: icon = String({ male: "person-fill", female: "person", steading: "house-door-fill", mount: "bicycle" }[item?.category] || "");
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        {capitalize(item.category)} from {item.kingdom.description}
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Icon name={icon} />
        {item.description}
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
</style>
