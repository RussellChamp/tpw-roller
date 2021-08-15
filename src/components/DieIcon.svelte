<script lang="ts">
  export let faces: number = 12;
  export let value: number = 1;
</script>

<main>
  <div
    class="icon"
    class:d4={faces == 4}
    class:d6={faces == 6}
    class:d8={faces == 8}
    class:d10={faces == 10}
    class:d12={faces == 12}
    class:d20={faces == 20}
  >
    <span class="value">
      &nbsp;[d{faces}: {value}]
    </span>
  </div>
</main>

<style>
  main {
    display: inline-block;
  }
  /* .icon {
    font-size: 2em;
    color: white;
  }
  .value {
    position: relative;
  } */
  .d4 {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid #555;
  }
  .d6 {
    height: 50px;
    width: 50px;
    background-color: #555;
  }
</style>
