<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Icon, Tooltip } from "sveltestrap";
  import { sample } from "lodash";

  import ClipboardHelper from "./ClipboardHelper.svelte";

  const dispatch = createEventDispatcher();

  export let showCopy: boolean = true;
  export let showReroll: boolean = true;
  export let showRemove: boolean = true;

  export let data: any;
  export let dataType: string;

  let rerollIcon = getIcon();

  function getIcon() {
    return "dice-" + sample([1, 2, 3, 4, 5, 6]);
  }

  function reroll() {
    rerollIcon = getIcon();
    dispatch("reroll");
  }

  function remove() {
    dispatch("remove");
  }
</script>

<main>
  <div class="buttons">
    {#if showCopy}
      <div class="clipboard">
        <ClipboardHelper {data} {dataType} />
      </div>
    {/if}
    {#if showReroll}
      <div class="reroll">
        <Button id="reroll" outline color="dark" on:click={reroll}>
          <Icon name={rerollIcon} />
        </Button>
        <Tooltip target="reroll" placement="top">Reroll Item</Tooltip>
      </div>
    {/if}
    {#if showRemove}
      <Button id="remove" outline color="danger" on:click={remove}>
        <Icon name="x" />
      </Button>
      <Tooltip target="remove" placement="top">Remove Item</Tooltip>
    {/if}
  </div>
</main>

<style>
  .buttons {
    display: flex;
  }
  .clipboard {
    padding-right: 5px;
  }
  .reroll {
    padding-right: 5px;
  }
</style>
