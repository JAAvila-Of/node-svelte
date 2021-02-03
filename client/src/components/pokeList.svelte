<script lang="ts">
  import { pokeStore } from "../stores/pokedex";
  import { modalState } from "../stores/modal";
  import { useModal } from "../stores/useModal";

  export let pokeName: string;
  export let pokeId: number;
  export let poke_id: string;
  export let pokeAlias: string;
  export let pokePoster: string;
  export let pokeTypes: Array<any> = [];
  export let modal;

  $: if (!$pokeStore.includes(pokeId)) {
    $pokeStore = [...$pokeStore, pokeId];
  }

  const modify = () => {
    modal();
    $useModal = 1;
    $modalState = { pokeName, pokeAlias, poke_id };
  };

  const remove = () => {
    modal();
    $useModal = 2;
    $modalState = { pokeName, pokeAlias, poke_id };
  };
</script>

<div class="bg-gray-800 shadow-lg rounded-xl body-card m-2">
  <div class="grid grid-cols-9 h-full">
    <div class="flex items-center col-span-2">
      <div class="ml-3">
        <img
          src={pokePoster}
          alt="ditto"
          class="rounded-full h-16 w-16 border-2 shadow-xl bg-gray-400"
        />
      </div>
    </div>
    <div class="col-span-6 text-white my-2">
      <div class="block text-xs">{pokeId} {pokeName}</div>
      <div class="block text-2xl ml-2">{pokeAlias}</div>
      <div class="block text-xs space-x-3">
        {#each pokeTypes as t}
          <div
            class="rounded-full bg-green-800 text-white text-xs px-2 shadow inline-block font-medium"
          >
            {t}
          </div>
        {/each}
      </div>
    </div>
    <div class="col-span-1 text-xl text-center ">
      <div
        class="block h-1/2 bg-yellow-300 rounded-tr-xl cursor-pointer"
        on:click={modify}
      />
      <div
        class="block h-1/2 bg-red-600 rounded-br-xl cursor-pointer"
        on:click={remove}
      />
    </div>
  </div>
</div>

<style>
  .body-card {
    height: 5rem;
  }
</style>
