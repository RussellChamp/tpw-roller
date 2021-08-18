<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button, Icon } from "sveltestrap";

  const dispatch = createEventDispatcher();
  let soundEnabled = true;

  function toggleSound() {
    soundEnabled = !soundEnabled;
    dispatch("soundToggle", { soundEnabled });
  }
</script>

<main>
  <Button color="primary" on:click={toggleSound}>Toggle Sound <Icon name={soundEnabled ? "volume-up-fill" : "volume-mute-fill"} /></Button>
</main>

<style>
</style>
