<script lang="ts">
  import * as _ from "lodash";
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

  function addResult(item: { type: string; description: string; roll: number }) {
    rollResults = [{ type: item.type, value: item.description, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollAbility())}>Roll Ability</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollActivity())}>Roll Activity</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollAdjective())}>Roll Adjective</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollAge())}>Roll Age</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollAlignment())}>Roll Alignment</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollAspect())}>Roll Aspect</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollCondition())}>Roll Condition</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollDisposition())}>Roll Disposition</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollElement())}>Roll Element</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollFeature())}>Roll Feature</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollMagicType())}>Roll MagicType</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollNumAppearing())}>Roll NumAppearing</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollOddity())}>Roll Oddity</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollOrientation())}>Roll Orientation</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollRuination())}>Roll Ruination</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollSize())}>Roll Size</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollTag())}>Roll Tag</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollTerrain())}>Roll Terrain</Button>
  </span>
  <span class="btn">
    <Button color="primary" on:click={() => addResult(rollVisibility())}>Roll Visibility</Button>
  </span>

  {#each rollResults as result}
    <h4>{result.timestamp}: ({result.type}): {result.value}</h4>
  {/each}
</main>

<style>
</style>
