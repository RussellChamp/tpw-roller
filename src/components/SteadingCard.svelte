<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row } from "sveltestrap";
  import { capitalize } from "lodash";

  import DieIcon from "./DieIcon.svelte";
  import CreatureCard from "./CreatureCard.svelte";
  import { rollSteading, Steading } from "../rollers/steadings";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let steading: Steading;
  export let timestamp: string = "";
  export let showRemove: boolean = true;

  function reroll() {
    steading = rollSteading();
    dispatch("rerolled", new RerolledEvent("steading", steading));
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
          <div class="description">Steading: {capitalize(steading.category)}<DieIcon value={steading.roll} /></div>
          <CardButtons data={steading} dataType="steading" on:reroll={reroll} {showRemove} on:remove={remove} />
        </div>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Container>
          <Row>
            <h4>Built by:</h4>
            <CreatureCard creature={steading.builtBy} showRemove={false} />
          </Row>
          <Row>
            <h4>Tags</h4>
            <ul>
              {#each steading.tags as tag}
                <li>{tag}</li>
              {/each}
            </ul>
          </Row>
          <Row>
            <h4>{capitalize(steading.condition)}:</h4>
          </Row>
          <Row>
            <h4>{capitalize(steading.benefit.description)} <DieIcon value={steading.benefitRoll} />:</h4>
            <ul>
              {#each steading.benefit.tags as btag}
                <li>{btag}</li>
              {/each}
            </ul>
          </Row>
          <Row>
            <h4>{capitalize(steading.problem.description)} <DieIcon value={steading.problemRoll} />:</h4>
            <ul>
              {#each steading.problem.tags as ptag}
                <li>{ptag}</li>
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
  ul {
    margin-left: 2em;
  }
</style>
