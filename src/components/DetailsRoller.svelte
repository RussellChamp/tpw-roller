<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  import {
    Detail,
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
  } from "../rollers/details";

  const dispatch = createEventDispatcher();

  function roll(value: Detail) {
    dispatch("roll", { type: "detail", value });
  }
</script>

<main>
  <Button color="primary" on:click={() => roll(rollAbility())}>Roll Ability</Button>
  <Button color="primary" on:click={() => roll(rollActivity())}>Roll Activity</Button>
  <Button color="primary" on:click={() => roll(rollAdjective())}>Roll Adjective</Button>
  <Button color="primary" on:click={() => roll(rollAge())}>Roll Age</Button>
  <Button color="primary" on:click={() => roll(rollAlignment())}>Roll Alignment</Button>
  <Button color="primary" on:click={() => roll(rollAspect())}>Roll Aspect</Button>
  <Button color="primary" on:click={() => roll(rollCondition())}>Roll Condition</Button>
  <Button color="primary" on:click={() => roll(rollDisposition())}>Roll Disposition</Button>
  <Button color="primary" on:click={() => roll(rollElement())}>Roll Element</Button>
  <Button color="primary" on:click={() => roll(rollFeature())}>Roll Feature</Button>
  <Button color="primary" on:click={() => roll(rollMagicType())}>Roll MagicType</Button>
  <Button color="primary" on:click={() => roll(rollNumAppearing())}>Roll NumAppearing</Button>
  <Button color="primary" on:click={() => roll(rollOddity())}>Roll Oddity</Button>
  <Button color="primary" on:click={() => roll(rollOrientation())}>Roll Orientation</Button>
  <Button color="primary" on:click={() => roll(rollRuination())}>Roll Ruination</Button>
  <Button color="primary" on:click={() => roll(rollSize())}>Roll Size</Button>
  <Button color="primary" on:click={() => roll(rollTag())}>Roll Tag</Button>
  <Button color="primary" on:click={() => roll(rollTerrain())}>Roll Terrain</Button>
  <Button color="primary" on:click={() => roll(rollVisibility())}>Roll Visibility</Button>
</main>

<style>
</style>
