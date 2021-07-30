<script lang="ts">
  import { format as formatDate } from "date-fns";
  import { Button, Icon } from "sveltestrap";
  import {
    rollAbility,
    rollActivity,
    rollAdjective,
    rollAge,
    rollAlignment,
    rollAspect,
    rollCondition,
    rollDisposition,
    rollElement,
    rollFeature,
    rollMagicType,
    rollNumAppearing,
    rollOddity,
    rollOrientation,
    rollRuination,
    rollSize,
    rollTag,
    rollTerrain,
    rollVisibility,
  } from "./details";

  let rollResults: { type: string; value: string; timestamp: string }[] = [];

  function roll(item: { type: string; description: string; roll: number }) {
    rollResults = [{ type: item.type, value: item.description, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollAbility())}>Roll Ability</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollActivity())}>Roll Activity</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollAdjective())}>Roll Adjective</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollAge())}>Roll Age</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollAlignment())}>Roll Alignment</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollAspect())}>Roll Aspect</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollCondition())}>Roll Condition</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollDisposition())}>Roll Disposition</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollElement())}>Roll Element</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollFeature())}>Roll Feature</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollMagicType())}>Roll MagicType</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollNumAppearing())}>Roll NumAppearing</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollOddity())}>Roll Oddity</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollOrientation())}>Roll Orientation</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollRuination())}>Roll Ruination</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollSize())}>Roll Size</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollTag())}>Roll Tag</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollTerrain())}>Roll Terrain</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => roll(rollVisibility())}>Roll Visibility</Button>
  </span>

  {#each rollResults as { type, value, timestamp }}
    <h4>{timestamp}: ({type}): {value}</h4>
  {/each}
</main>

<style>
</style>
