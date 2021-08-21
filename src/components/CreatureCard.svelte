<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize } from "lodash";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardSubtitle,
    CardText,
    CardFooter,
    Container,
    Row,
    Button,
    Icon,
    Tooltip,
  } from "sveltestrap";

  import ClipboardHelper from "./ClipboardHelper.svelte";
  import NpcCard from "./NpcCard.svelte";
  import DieIcon from "./DieIcon.svelte";
  import type { Creature } from "../rollers/creatures";

  const dispatch = createEventDispatcher();

  export let creature: Creature;
  export let timestamp: string;

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
            {capitalize(creature.type)}<DieIcon value={creature.roll} />
            {#if creature.subtype !== ""}({creature.subtype})<DieIcon value={creature.subroll} />{/if}: {capitalize(
              creature.description
            )}<DieIcon value={creature.specificroll} />
          </div>
          <div class="buttons">
            <ClipboardHelper data={creature} dataType="creature" />
            <Button id="remove" outline color="danger" on:click={remove}>
              <Icon name="x" />
            </Button>
            <Tooltip target="remove" placement="top">Remove Item</Tooltip>
          </div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Container>
          <Row>
            <strong>Details:</strong>
            <ul>
              {#if creature.ability}<li>Ability: {creature.ability.description}<DieIcon value={creature.ability.roll} /></li>{/if}
              {#if creature.activity}<li>Activity: {creature.activity.description}<DieIcon value={creature.activity.roll} /></li>{/if}
              {#if creature.adjective}<li>
                  Adjective: {creature.adjective.description}
                  <DieIcon value={creature.adjective.roll} />
                </li>{/if}
              {#if creature.age}<li>Age: {creature.age.description}<DieIcon value={creature.age.roll} /></li>{/if}
              {#if creature.alignment}<li>
                  Alignment: {creature.alignment.description}
                  <DieIcon value={creature.alignment.roll} />
                </li>{/if}
              {#if creature.aspect}<li>Aspect: {creature.aspect.description}<DieIcon value={creature.aspect.roll} /></li>{/if}
              {#if creature.condition}<li>
                  Condition: {creature.condition.description}
                  <DieIcon value={creature.condition.roll} />
                </li>{/if}
              {#if creature.disposition}<li>
                  Disposition: {creature.disposition.description}
                  <DieIcon value={creature.disposition.roll} />
                </li>{/if}
              {#if creature.feature}<li>Feature: {creature.feature.description}<DieIcon value={creature.feature.roll} /></li>{/if}
              {#if creature.npc}<li>
                  NPC Stats:
                  <NpcCard npc={creature.npc} {timestamp} />
                </li>{/if}
              {#if creature.numAppearing}<li>
                  Number Appearing: {creature.numAppearing.description}
                  <DieIcon value={creature.numAppearing.roll} />
                </li>{/if}
              {#if creature.size}<li>Size: {creature.size.description}<DieIcon value={creature.size.roll} /></li>{/if}
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
</main>

<style>
  main {
    text-align: left;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .title .buttons {
    display: flex;
  }
  ul {
    margin-left: 2em;
  }
</style>
