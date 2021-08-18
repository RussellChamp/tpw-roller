<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";

  import DieIcon from "./DieIcon.svelte";
  import CreatureCard from "./CreatureCard.svelte";
  import type { Steading } from "../rollers/steadings";

  export let steading: Steading;
  export let timestamp: string;
</script>

<main>
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        {capitalize(steading.category)}
        <DieIcon value={steading.roll} />
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        <Container>
          <Row>
            <h3>Built by:</h3>
            <CreatureCard creature={steading.builtBy} {timestamp} />
          </Row>
          <Row>
            <h3>Tags</h3>
            <ul>
              {#each steading.tags as tag}
                <li>{tag}</li>
              {/each}
            </ul>
          </Row>
          <Row>
            <h3>{capitalize(steading.condition)}:</h3>
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
