<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { format as formatDate } from "date-fns";
  import { Dungeon, rollDungeon } from "./dungeons";
  import { capitalize } from "lodash";

  export let rollResults: { dungeon: Dungeon; timestamp: string }[] = [];

  function roll(event: Event) {
    let dungeon = rollDungeon();

    rollResults = [{ dungeon, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
  function getIcon(t: string, c: string): string {
    return t == "discovery"
      ? "eye-fill"
      : t == "danger"
      ? "exclamation-triangle-fill"
      : c == "mundane"
      ? "exclamation-triangle"
      : c == "unusual"
      ? "exclamation-square"
      : c == "extraordinary"
      ? "exclamation-octagon"
      : "";
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Dungeon</Button>
  </span>

  {#each rollResults as { dungeon, timestamp }}
    <Card class="mb-3">
      <CardHeader>
        <CardTitle
          >{capitalize(dungeon.size.description)} {dungeon.function.description} built by (a/an) {dungeon.builder.description}</CardTitle
        >
      </CardHeader>
      <CardBody>
        <CardSubtitle>
          Fell to ruination from <em>{dungeon.ruination.description}</em>.
        </CardSubtitle>
        <CardText>
          <Container>
            <Row>
              <strong>Common Themes ({dungeon.size.commonThemes}):</strong>
              <ul>
                {#each dungeon.commonThemes as theme}
                  <li><Icon name={getIcon("theme", theme.category)} /> {theme.category}: {theme.description}</li>
                {/each}
              </ul>
            </Row>
            <Row>
              <strong>Unique Themes ({dungeon.size.uniqueThemes}):</strong>
              <ul>
                {#each dungeon.uniqueThemes as theme}
                  <li><Icon name={getIcon("theme", theme.category)} /> {theme.category}: {theme.description}</li>
                {/each}
              </ul>
            </Row>
            <Row>
              <strong>Common Areas ({dungeon.size.commonAreas}):</strong>
              <ul>
                {#each dungeon.commonAreas as area}
                  <li><Icon name={getIcon(area.type, area.category)} /> {area.type}/{area.category}: {area.description}</li>
                {/each}
              </ul>
            </Row>
            <Row>
              <strong>Unique Areas ({dungeon.size.uniqueAreas}):</strong>
              <ul>
                {#each dungeon.uniqueAreas as area}
                  <li><Icon name={getIcon(area.type, area.category)} /> {area.type}/{area.category}: {area.description}</li>
                {/each}
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
  h2 {
    text-align: center;
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
