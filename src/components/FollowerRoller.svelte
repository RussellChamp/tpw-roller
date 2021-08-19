<script lang="ts">
  import { Button } from "sveltestrap";
  import { format as formatDate } from "date-fns";
  import { createEventDispatcher } from "svelte";

  import FollowerCard from "./FollowerCard.svelte";
  import { rollFollower, Follower } from "../rollers/followers";

  const dispatch = createEventDispatcher();

  export let rollResults: { follower: Follower; timestamp: string }[] = [];

  function roll(event: Event) {
    let follower = rollFollower();
    rollResults = [{ follower, timestamp: formatDate(new Date(), "P kk:mm:ss") }, ...rollResults];
    dispatch("roll");
  }
</script>

<main>
  <span class="btn">
    <Button color="primary" on:click={roll}>Roll Followers</Button>
  </span>

  {#each rollResults as { follower, timestamp }}
    <FollowerCard {follower} {timestamp} />
  {/each}
</main>

<style>
  main {
    text-align: left;
  }
  .btn {
    text-align: center;
  }
</style>
