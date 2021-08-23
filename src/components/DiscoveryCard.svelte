<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";

  import DieIcon from "./DieIcon.svelte";
  import CreatureCard from "./CreatureCard.svelte";
  import SteadingCard from "./SteadingCard.svelte";
  import CardButtons from "./CardTitleButtons.svelte";
  import { Discovery, rollDiscovery } from "../rollers/discoveries";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let discovery: Discovery;
  export let timestamp: string;

  let hasDetails = false;
  $: hasDetails = !!(
    discovery.age ||
    discovery.alignment ||
    discovery.aspect ||
    discovery.creature ||
    discovery.element ||
    discovery.magicType ||
    discovery.ruination ||
    discovery.size ||
    discovery.steading ||
    discovery.visibility
  );

  function reroll() {
    discovery = rollDiscovery();
    dispatch("rerolled", new RerolledEvent("discovery", discovery));
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
            Discovery:
            {capitalize(discovery.category)}
            <DieIcon value={discovery.roll} />
          </div>
          <CardButtons data={discovery} dataType="discovery" on:reroll={reroll} on:remove={remove} />
        </div></CardTitle
      >
    </CardHeader>
    <CardBody>
      <CardText>
        <Container>
          <h4>
            Type{#if discovery.subcategory !== ""}&nbsp;{capitalize(discovery.subcategory)}<DieIcon value={discovery.subroll} />{/if}: {capitalize(
              discovery.description
            )}
            <DieIcon value={discovery.specificroll} />
          </h4>

          {#if discovery.category == "creature"}
            <Row>
              <CreatureCard creature={discovery.creature} showRemove={false} />
            </Row>
          {:else if discovery.category == "structure" && discovery.steading}
            <Row>
              <SteadingCard steading={discovery.steading} showRemove={false} />
            </Row>
          {:else if hasDetails}
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
                    <CreatureCard creature={discovery.creature} {timestamp} showRemove={false} />
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
  ul {
    margin-left: 2em;
  }
</style>
