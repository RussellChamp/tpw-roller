<script lang="ts">
  import { capitalize } from "lodash";
  import { format as formatDate } from "date-fns";
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row } from "sveltestrap";
  import { Creature, rollCreature } from "./creatures";

  export let rollResults: { creature: Creature; timestamp: string }[] = [];

  function roll(event: Event) {
    let creature = rollCreature();
    rollResults = [{ creature, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Creature</Button>

  {#each rollResults as { creature, timestamp }}
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>
          {capitalize(creature.type)}
          {#if creature.subtype !== ""}({creature.subtype}) {/if}: {capitalize(creature.description)}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          <Container>
            <Row>
              <strong>Details:</strong>
              <ul>
                {#if creature.ability}<li>Ability: {creature.ability.description}</li>{/if}
                {#if creature.activity}<li>Activity: {creature.activity.description}</li>{/if}
                {#if creature.adjective}<li>Adjective: {creature.adjective.description}</li>{/if}
                {#if creature.age}<li>Age: {creature.age.description}</li>{/if}
                {#if creature.alignment}<li>Alignment: {creature.alignment.description}</li>{/if}
                {#if creature.aspect}<li>Aspect: {creature.aspect.description}</li>{/if}
                {#if creature.condition}<li>Condition: {creature.condition.description}</li>{/if}
                {#if creature.disposition}<li>Disposition: {creature.disposition.description}</li>{/if}
                {#if creature.feature}<li>Feature: {creature.feature.description}</li>{/if}
                {#if creature.npc}<li>NPC Name: {creature.npc.name}</li>{/if}
                {#if creature.numAppearing}<li>Number Appearing: {creature.numAppearing.description}</li>{/if}
                {#if creature.size}<li>Size: {creature.size.description}</li>{/if}
                {#if creature.tags.length > 0}<li>
                    Tags: {#each creature.tags as tag} {tag.description}, {/each}
                  </li>{/if}
              </ul>
            </Row>
          </Container>
        </CardText>
      </CardBody>
      <CardFooter>{timestamp}</CardFooter>
    </Card>
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
  .card-subtitle {
    padding-bottom: 1em;
  }
  ul {
    margin-left: 2em;
  }
</style>
