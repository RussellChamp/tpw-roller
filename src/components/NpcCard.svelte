<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    Accordion,
    AccordionItem,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardSubtitle,
    CardText,
    CardFooter,
    Container,
    Col,
    Row,
    Icon,
  } from "sveltestrap";
  import { Npc, rollNpc } from "../rollers/npcs";
  import FollowerCard from "./FollowerCard.svelte";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let npc: Npc;
  export let timestamp: string = "";
  export let showRemove: boolean = true;

  function reroll() {
    npc = rollNpc();
    dispatch("rerolled", new RerolledEvent("npc", npc));
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
            NPC: {npc.getDescription()}
          </div>
          <CardButtons data={npc} dataType="npc" on:reroll={reroll} {showRemove} on:remove={remove} />
        </div></CardTitle
      >
    </CardHeader>
    <CardBody>
      <CardSubtitle>
        From <em>{npc.hometown}</em>.
      </CardSubtitle>
      <CardText>
        <Container>
          <Row>
            <strong>Background Context:</strong>
            <ul>
              <li>
                They are a(n) <em>{npc.context.alignment.description}</em> <em>{npc.context.description}</em> with
                <em>{npc.traits[0]?.category} ({npc.context.trait.description})</em>
                encountered in a(n) <em>{npc.context.category}</em> setting while they are <em>{npc.context.activity.description}</em>
              </li>
            </ul>
          </Row>
          <!-- <Row>
            <Accordion>
              <AccordionItem header="Follower Stats">
                <FollowerCard follower={npc.follower} showRemove={false} />
              </AccordionItem>
            </Accordion>
          </Row> -->
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
