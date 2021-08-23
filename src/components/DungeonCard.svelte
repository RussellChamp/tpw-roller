<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";

  import { Dungeon, rollDungeon } from "../rollers/dungeons";
  import CardButtons from "./CardTitleButtons.svelte";
  import { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let dungeon: Dungeon;
  export let timestamp;

  function reroll() {
    dungeon = rollDungeon();
    dispatch("rerolled", new RerolledEvent("dungeon", dungeon));
  }

  function remove() {
    dispatch("remove");
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
  <Card class="mb-3">
    <CardHeader>
      <CardTitle>
        <div class="title">
          <div class="description">
            Dungeon:
            {capitalize(dungeon.size.description)}
            {dungeon.function.description} built by {dungeon.builder.description}
          </div>
          <CardButtons data={dungeon} dataType="dungeon" on:reroll={reroll} on:remove={remove} />
        </div>
      </CardTitle>
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
