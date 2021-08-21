<script lang="ts">
  import { capitalize } from "lodash";
  import { Button, Icon, Tooltip } from "sveltestrap";

  export let dataType: string;
  export let data: any;

  function handleClick() {
    if (data) {
      prompt(`${capitalize(dataType)} data`, JSON.stringify(data));

      // This won't work until I support a https connection
      // navigator.clipboard.writeText(JSON.stringify(data));
    }
  }
</script>

<main>
  <Button id="copyHelper" color="secondary" on:click={handleClick}>
    <Icon name="clipboard-data" />
  </Button>
  <Tooltip target="copyHelper" placement="top">Copy to Clipboard</Tooltip>
</main>

<style>
</style>
