<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";

  import DieIcon from "./DieIcon.svelte";
  import CreatureCard from "./CreatureCard.svelte";
  import type { Discovery } from "../rollers/discoveries";

  export let discovery: Discovery;
  export let timestamp: string;
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        {capitalize(discovery.category)}
        <DieIcon value={discovery.roll} />
        {#if discovery.subcategory !== ""}
          ({discovery.subcategory}<DieIcon value={discovery.subroll} />){/if}: {capitalize(discovery.description)}
        <DieIcon value={discovery.specificroll} />
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Container>
          {#if discovery.category == "creature"}
            <Row>
              <CreatureCard creature={discovery.creature} {timestamp} />
            </Row>
          {:else if discovery.category == "steading"}
            <Row>
              <p>TODO: format steadings</p>
            </Row>
          {:else}
            <Row>
              <strong>Details:</strong>
              <ul>
                {#if discovery.age}<li>Age: {discovery.age.description}<DieIcon value={discovery.age.roll} /></li>{/if}
                {#if discovery.alignment}<li>
                    Alignment: {discovery.alignment.description}<DieIcon value={discovery.alignment.roll} />
                  </li>{/if}
                {#if discovery.aspect}<li>Aspect: {discovery.aspect.description}<DieIcon value={discovery.aspect.roll} /></li>{/if}
                {#if discovery.creature}<li>
                    Produced/Inhabited By: {discovery.creature.description}<DieIcon value={discovery.creature.roll} />
                    <CreatureCard creature={discovery.creature} {timestamp} />
                  </li>{/if}
                {#if discovery.element}<li>Element: {discovery.element.description}<DieIcon value={discovery.element.roll} /></li>{/if}
                {#if discovery.magicType}<li>
                    MagicType: {discovery.magicType.description}<DieIcon value={discovery.magicType.roll} />
                  </li>{/if}
                {#if discovery.ruination}<li>
                    Ruination: {discovery.ruination.description}<DieIcon value={discovery.ruination.roll} />
                  </li>{/if}
                {#if discovery.size}<li>Size: {discovery.size.description}<DieIcon value={discovery.size.roll} /></li>{/if}
                {#if discovery.steading}<li>Steading: {discovery.steading.description}<DieIcon value={discovery.steading.roll} /></li>{/if}
                {#if discovery.visibility}<li>
                    Visibility: {discovery.visibility.description}<DieIcon value={discovery.visibility.roll} />
                  </li>{/if}
              </ul>
            </Row>
          {/if}
        </Container>
      </CardText>
    </CardBody>
    <CardFooter>{timestamp}</CardFooter>
  </Card>
</main>

<style>
  main {
    text-align: left;
  }
  ul {
    margin-left: 2em;
  }
</style>
