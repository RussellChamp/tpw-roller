<script lang="ts">
  import {
    Button,
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
  import { capitalize } from "lodash";
  import { format as formatDate } from "date-fns";
  import { Npc, rollNpc } from "./npcs";

  export let rollResults: { npc: Npc; timestamp: string }[] = [];

  function roll(event: Event) {
    let npc = rollNpc();

    rollResults = [{ npc, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
  function getIcon(t: string, c: string): string {
    return "";
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Npc</Button>
  </span>

  {#each rollResults as { npc, timestamp }}
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>{npc.getDescription()}</CardTitle>
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
                  <em>{npc.trait.category} ({npc.context.trait.description})</em>
                  encountered in a(n) <em>{npc.context.category}</em> setting while they are <em>{npc.context.activity.description}</em>
                </li>
              </ul>
            </Row>
            <Row>
              <strong>Follower Stats:</strong>
              <ul>
                <li>{npc.follower.name}</li>
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
  ul {
    margin-left: 2em;
  }
  .btn {
    text-align: center;
  }
  .card-subtitle {
    padding-bottom: 1em;
  }
</style>
