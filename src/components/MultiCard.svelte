<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import CreatureCard from "./CreatureCard.svelte";
  import DangerCard from "./DangerCard.svelte";
  import DetailsCard from "./DetailsCard.svelte";
  import DiscoveryCard from "./DiscoveryCard.svelte";
  import DungeonCard from "./DungeonCard.svelte";
  import FollowerCard from "./FollowerCard.svelte";
  import KingdomCard from "./KingdomCard.svelte";
  import NpcCard from "./NpcCard.svelte";
  import PlaceCard from "./PlaceCard.svelte";
  import RegionCard from "./RegionCard.svelte";
  import SteadingCard from "./SteadingCard.svelte";

  import type { RollCard } from "../types/RollCard";
  import type { RerolledEvent } from "../types/RerolledEvent";

  const dispatch = createEventDispatcher();
  export let card: RollCard;

  function rerolled(event: CustomEvent<RerolledEvent>) {
    // pass along the event
    dispatch("rerolled", event.detail);
  }
  function remove() {
    dispatch("remove", card);
  }
</script>

<main>
  {#if card.type == "creature"}
    <CreatureCard creature={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "danger"}
    <DangerCard danger={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "detail"}
    <DetailsCard detail={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "discovery"}
    <DiscoveryCard discovery={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "dungeon"}
    <DungeonCard dungeon={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "follower"}
    <FollowerCard follower={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "kingdom"}
    <KingdomCard item={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "npc"}
    <NpcCard npc={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "place"}
    <PlaceCard place={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "region"}
    <RegionCard region={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else if card.type == "steading"}
    <SteadingCard steading={card.value} timestamp={card.timestamp} on:rerolled={rerolled} on:remove={remove} />
  {:else}
    <h3>Card type not supported: {card.type}</h3>
  {/if}
</main>

<style>
</style>
