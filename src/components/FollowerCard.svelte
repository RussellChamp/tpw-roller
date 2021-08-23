<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Col, Row } from "sveltestrap";
  import { Follower, rollFollower } from "../rollers/followers";
  import { RerolledEvent } from "../types/RerolledEvent";
  import CardButtons from "./CardTitleButtons.svelte";

  const dispatch = createEventDispatcher();
  export let follower: Follower;
  export let timestamp: string = "";
  export let showRemove: boolean = true;

  function reroll() {
    follower = rollFollower();
    dispatch("rerolled", new RerolledEvent("follower", follower));
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
            Follower: {follower.name} ({follower.gender})
          </div>
          <CardButtons data={follower} dataType="follower" on:reroll={reroll} {showRemove} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardSubtitle>
        From <em>{follower.homeSteading.homesteadName}</em> in <em>{follower.homeSteading.kingdomName}</em>
      </CardSubtitle>
      <CardText>
        <Container>
          <Row>
            <strong>Quality:</strong>
            <p>
              They are <em>{follower.quality.description}</em> (Quality: {follower.quality.value}). They
              <em>{follower.background.description}</em>.
            </p>
          </Row>
          <Row>
            <strong>Tags:</strong>
            <ul>
              {#each follower.tags as tag}
                <li>{tag.name}: {tag.description}</li>
              {/each}
            </ul>
          </Row>
          <Row>
            <strong>Moves:</strong>
            <ul>
              {#each follower.moves as move}
                <li>{move.description}</li>
              {/each}
            </ul>
          </Row>
          <Row>
            <strong>Loyalty:</strong>
            <p>
              They have a loyalty score of {follower.loyalty.value}{#if !!follower.loyalty.description}
                and <em>{follower.loyalty.description}</em>{/if}.
            </p>
          </Row>
          <Row>
            <strong>Instinct:</strong>
            <p>
              When left to their own devices, they will <em>{follower.instinct.description}</em>.
            </p>
          </Row>
          <Row>
            <strong>Cost:</strong>
            <p>
              They are motivated by <em>{follower.cost.name}</em>. They will want <em>{follower.cost.description}</em>
            </p>
          </Row>
          <Row>
            <strong>Hit Points:</strong>
            <p>
              They are <em>{follower.hitPoints.description}</em> and have {follower.hitPoints.value} HP.
            </p>
          </Row>
          <Row>
            <strong>Armor & Shield:</strong>
            <p>
              They are equipped with <em>{follower.armor.description}</em> ({follower.armor.value} armor).
            </p>
          </Row>
          <Row>
            <strong>Damage:</strong>
            <p>
              In a fight, they <em>{follower.damage.description}</em> dealing <em>d{follower.damage.value}</em> damage.
            </p>
          </Row>
          <Row>
            <strong>Load & Gear:</strong>
            <ul>
              {#each follower.loadAndGear.gear as gear}
                <li>{gear}</li>
              {/each}
            </ul>
          </Row>
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
  p {
    margin-left: 1em;
  }
  ul {
    margin-left: 2em;
  }
</style>
