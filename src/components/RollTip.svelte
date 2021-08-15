<script lang="ts">
  import { Tooltip } from "sveltestrap";

  export let item: { roll: number; description: string };
</script>

<main>
  <span id="tip" />
  <Tooltip target="tip" placement="top">{item.description}</Tooltip>
</main>

<style>
  main {
    display: inline-block;
  }
</style>
