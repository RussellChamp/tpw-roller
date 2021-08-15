<script lang="ts">
  import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Col, Row, Icon } from "sveltestrap";
  import type { Npc } from "../rollers/npcs";

  export let npc: Npc;
  export let timestamp: string;
</script>

<main>
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
</main>

<style>
  main {
    text-align: left;
  }
  ul {
    margin-left: 2em;
  }
</style>
