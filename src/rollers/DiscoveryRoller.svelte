<script lang="ts">
  import { Button, Card, CardHeader, CardTitle, CardBody, CardSubtitle, CardText, CardFooter, Container, Row, Icon } from "sveltestrap";
  import { capitalize } from "lodash";
  import { format as formatDate } from "date-fns";
  import { Discovery, rollDiscovery } from "./discoveries";

  export let rollResults: { discovery: Discovery; timestamp: string }[] = [];

  function roll(event: Event) {
    let discovery = rollDiscovery();

    rollResults = [{ discovery, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
  function getIcon(t: string, c: string): string {
    return "";
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Discovery</Button>
  </span>

  {#each rollResults as { discovery, timestamp }}
    <Card class="mb-3">
      <CardHeader>
        <CardTitle
          >{capitalize(discovery.category)}{#if discovery.subcategory !== ""}&nbsp;({discovery.subcategory}){/if}: {capitalize(
            discovery.description
          )}</CardTitle
        >
      </CardHeader>
      <CardBody>
        <CardText>
          <Container>
            {#if discovery.category == "creature"}
              <Row>
                <p>Are you feeling lucky, punk?</p>
              </Row>
            {:else if discovery.category == "steading"}
              <Row>
                <p>TODO: format steadings</p>
              </Row>
            {:else}
              <Row>
                <strong>Details:</strong>
                <ul>
                  {#if discovery.age}<li>Age: {discovery.age.description}</li>{/if}
                  {#if discovery.alignment}<li>Alignment: {discovery.alignment.description}</li>{/if}
                  {#if discovery.aspect}<li>Aspect: {discovery.aspect.description}</li>{/if}
                  {#if discovery.creature}<li>Produced/Inhabited By: {discovery.creature.description}</li>{/if}
                  {#if discovery.element}<li>Element: {discovery.element.description}</li>{/if}
                  {#if discovery.magicType}<li>MagicType: {discovery.magicType.description}</li>{/if}
                  {#if discovery.ruination}<li>Ruination: {discovery.ruination.description}</li>{/if}
                  {#if discovery.size}<li>Size: {discovery.size.description}</li>{/if}
                  {#if discovery.steading}<li>Steading: {discovery.steading.description}</li>{/if}
                  {#if discovery.visibility}<li>Visibility: {discovery.visibility.description}</li>{/if}
                </ul>
              </Row>
            {/if}
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
</style>
