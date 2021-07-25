<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Col, Row } from "sveltestrap";
  import * as _ from "lodash";
  import { format as formatDate } from "date-fns";
  import { rollFollower, Follower } from "./followers";

  export let rollResults: { value: Follower; timestamp: string }[] = [];

  function roll(event: Event) {
    let follower = rollFollower();

    rollResults = [{ value: follower, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <h2>Random Follower</h2>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Followers</Button>
  </span>

  {#each rollResults as result}
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>{result.value.name} ({result.value.gender})</CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle>
          From <em>{result.value.homeSteading.homesteadName}</em> in <em>{result.value.homeSteading.kingdomName}</em>
        </CardSubtitle>
        <CardText>
          <Container>
            <Row>
              <strong>Quality:</strong>
              <p>
                They are <em>{result.value.quality.description}</em> (Quality: {result.value.quality.value}). They
                <em>{result.value.background.description}</em>.
              </p>
            </Row>
            <Row>
              <strong>Tags:</strong>
              <ul>
                {#each result.value.tags as tag}
                  <li>{tag.name}: {tag.description}</li>
                {/each}
              </ul>
            </Row>
            <Row>
              <strong>Moves:</strong>
              <ul>
                {#each result.value.moves as move}
                  <li>{move.description}</li>
                {/each}
              </ul>
            </Row>
            <Row>
              <strong>Loyalty:</strong>
              <p>
                They have a loyalty score of {result.value.loyalty.value}{#if !!result.value.loyalty.description}
                  and <em>{result.value.loyalty.description}</em>{/if}.
              </p>
            </Row>
            <Row>
              <strong>Instinct:</strong>
              <p>
                When left to their own devices, they will <em>{result.value.instinct.description}</em>.
              </p>
            </Row>
            <Row>
              <strong>Cost:</strong>
              <p>
                They are motivated by <em>{result.value.cost.name}</em>. They will want <em>{result.value.cost.description}</em>
              </p>
            </Row>
            <Row>
              <strong>Hit Points:</strong>
              <p>
                They are <em>{result.value.hitPoints.description}</em> and have {result.value.hitPoints.value} HP.
              </p>
            </Row>
            <Row>
              <strong>Armor & Shield:</strong>
              <p>
                They are equipped with <em>{result.value.armor.description}</em> ({result.value.armor.value} armor).
              </p>
            </Row>
            <Row>
              <strong>Damage:</strong>
              <p>
                In a fight, they <em>{result.value.damage.description}</em> dealing <em>d{result.value.damage.value}</em> damage.
              </p>
            </Row>
            <Row>
              <strong>Load & Gear:</strong>
              <ul>
                {#each result.value.loadAndGear.gear as gear}
                  <li>{gear}</li>
                {/each}
              </ul>
            </Row>
          </Container>
        </CardText>
      </CardBody>
      <CardFooter>{result.timestamp}</CardFooter>
    </Card>
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
  h2 {
    text-align: center;
  }
  p {
    margin-left: 1em;
  }
  ul {
    margin-left: 2em;
  }
  .btn {
    text-align: center;
  }
</style>
