<script lang="ts">
  import { navigate } from "svelte-routing";
  import { modalState } from "../stores/modal";
  import { useModal } from "../stores/useModal";

  import Modal from "../components/modal.svelte";
  import PokeList from "../components/pokeList.svelte";

  import type { IPokedex } from "../models/pokedex.model";
  import type { IPokeData } from "../models/pokeData.model";

  import * as pokedex from "../services/pokedex";

  let modal: Modal;
  let pokeL: PokeList;
  let bindInput: string;

  export let page: number = 1;
  let hasPokes: boolean = false;
  let paginator: boolean = false;
  let pokeData: Array<IPokeData>;
  let data: IPokedex;

  const action = async () => {
    const pokes = await pokedex.getPokes(page);

    if (pokes.status === 201) {
      data = pokes.data;
      pokeData = pokes.data.docs;

      paginator = data.totalPages > 1 ? true : false;
      hasPokes = pokeData.length >= 1 ? true : false;
    }
  };

  (async () => {
    await action();
  })();

  const nextPage = async () => {
    page = Number(page) + 1;
    navigate("/list/" + page);
    await action();
  };

  const prevPage = async () => {
    page = Number(page) - 1;
    navigate("/list/" + page);
    await action();
  };

  const editPokes = async () => {
    const { pokeAlias, poke_id } = $modalState;

    const edited = await pokedex.updatePokes(poke_id, { alias: pokeAlias });

    if (edited.status === 201) {
      await action();
      modal.toggle();
    }
  };

  const removePoke = async () => {
    const { poke_id } = $modalState;

    const removed = await pokedex.removePoke(poke_id);

    if (removed.status === 201) {
      await action();
      modal.toggle();
    }
  };
</script>

<main class="flex justify-center h-full bg-gray-500 ">
  <div id="canblured" class="">
    <div class="body-list mt-10">
      {#if hasPokes}
        {#each pokeData as { name, number, alias, poster, types, _id }}
          <PokeList
            bind:this={pokeL}
            pokeName={name}
            pokeId={number}
            poke_id={_id}
            pokeAlias={alias || name}
            pokeTypes={types}
            pokePoster={poster}
            modal={modal.toggle}
          />
        {/each}
      {:else}
        <div class="text-red-500 text-center">No hay Pokemones registrados</div>
      {/if}
    </div>
    {#if paginator && hasPokes}
      <div class="text-4xl mt-5 ">
        <div
          class="inline-block h-12 w-12 {data.hasPrevPage
            ? 'cursor-pointer'
            : 'cursor-default opacity-50'} text-center "
          on:click={data.hasPrevPage ? prevPage : null}
        >
          ◀
        </div>
        <div
          class="inline-block h-12 w-12 {data.hasNextPage
            ? 'cursor-pointer'
            : 'cursor-default opacity-50'} text-center float-right"
          on:click={data.hasNextPage ? nextPage : null}
        >
          ▶
        </div>
      </div>
    {/if}
  </div>
  <Modal bind:this={modal}>
    {#if $useModal === 1}
      <div class="h-full flex justify-center items-center">
        <div class="w-3/4">
          <label for="input-alias">Alias</label>
          <input
            type="text"
            id="input-alias"
            class="w-full text-center rounded-xl h-12 text-3xl shadow-md"
            bind:value={$modalState.pokeAlias}
          />
          <div class="mt-3 flex justify-between px-2 h-10">
            <button
              class="inline-block w-2/5 bg-red-900 text-white rounded-md"
              on:click={modal.toggle}>CANCELAR</button
            >
            <button
              class="inline-block w-2/5 bg-green-900 text-white rounded-md"
              on:click={editPokes}>ACEPTAR</button
            >
          </div>
        </div>
      </div>
    {:else if $useModal === 2}
      <div class="h-full flex justify-center items-center">
        <div class="w-3/4">
          <p class="text-center text-2xl">
            Eliminar a {$modalState.pokeName} alias '{$modalState.pokeAlias}'?
          </p>
          <div class="mt-3 flex justify-between px-2 h-10">
            <button
              class="inline-block w-2/5 bg-red-900 text-white rounded-md"
              on:click={modal.toggle}>CANCELAR</button
            >
            <button
              class="inline-block w-2/5 bg-green-900 text-white rounded-md"
              on:click={removePoke}>ACEPTAR</button
            >
          </div>
        </div>
      </div>
    {/if}
  </Modal>
</main>

<style>
  .body-list {
    width: 28rem;
  }
</style>
