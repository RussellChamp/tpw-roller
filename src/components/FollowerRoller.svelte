<script lang="ts">
  import { Button } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  import { rollFollower } from "../rollers/followers";

  const dispatch = createEventDispatcher();

  function roll(event: Event) {
    let follower = rollFollower();
    dispatch("roll", { type: "follower", value: follower });
  }
</script>

<main>
  <Button color="primary" on:click={roll}>Roll Follower</Button>
</main>

<style>
</style>
