<script lang="ts">
  import { fade } from "svelte/transition";
  import { getPoke } from "../services/pokeService";
  import { addPokes } from "../services/pokedex";
  import type { IPokeData } from "../models/pokeData.model";
  import { pokeStore } from "../stores/pokedex";

  let pokeValue: string = "";
  let pokeData: IPokeData;

  let pokeName: string = "Snorlax";
  let pokeId: number = 143;
  let pokeImg: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png";
  let pokeTypes: Array<string> = ["Normal"];

  let pokeFound: boolean = true;
  let pokeError: string = "";
  let pokeTrans: boolean = false;
  let pokeSaved: boolean = false;

  let pokeAdded: boolean = false;
  let pokeMsg: string = "";

  export const searchPoke = async () => {
    const pokeResult = await getPoke(pokeValue);

    if (pokeResult.status === 200) {
      pokeName = pokeResult.data.name;
      pokeId = pokeResult.data.id;
      pokeImg = pokeResult.data.sprites.other["official-artwork"].front_default;
      pokeTypes = pokeResult.data.types.map((type) => {
        return type.type.name;
      });

      if ($pokeStore.includes(pokeId)) {
        pokeSaved = true;
      } else {
        pokeSaved = false;
      }

      pokeData = {
        number: pokeId,
        name: pokeName,
        types: pokeTypes,
        poster: pokeImg,
        alias: "",
      };

      pokeFound = true;
      pokeTrans = true;
    } else {
      pokeFound = false;
      pokeError = pokeValue;
    }
  };

  export const onKeyPress = (e: KeyboardEvent) => {
    if (e.charCode === 13) searchPoke();
  };

  export const onKeyChange = () => {
    pokeTrans = false;
    pokeAdded = false;
  };

  export const savePoke = async () => {
    const saved = await addPokes(pokeData);

    if (saved.status === 201) {
      pokeSaved = true;

      $pokeStore = [...$pokeStore, pokeId];
    } else if (saved.status === 303) {
      pokeAdded = true;
      pokeMsg = saved.data.message;
      $pokeStore = [...$pokeStore, pokeId];
    }
  };
</script>

<main class="flex justify-center h-full bg-gray-500">
  <div class="h-5/6 flex">
    <div class=" grid grid-rows-7">
      <div class="row-span-2 flex items-center">
        <div>
          <div class="px-2 ">
            <div
              class="rounded border border-solid border-white p-2 flex relative"
            >
              <input
                type="text"
                id="input-poke"
                bind:value={pokeValue}
                on:keypress={onKeyPress}
                on:input={onKeyChange}
                class="text-4xl focus:outline-none bg-gray-500 border-none text-white text-center"
              />
              <button
                class="text-3xl border-none absolute inset-y-0 right-0"
                on:click={searchPoke}>🔍</button
              >
            </div>
          </div>
          {#if !pokeFound}
            <p class="text-center text-red-400">
              El pokemón {pokeError} no existe
            </p>
          {/if}
        </div>
      </div>

      <div class="row-span-5 flex justify-center mt-6">
        {#if pokeTrans}
          <div>
            <div
              transition:fade={{ delay: 250, duration: 300 }}
              class="shadow-2xl rounded-md bg-blue-50 w-3/5 p-2 poke-card block"
            >
              <div class="grid grid-rows-8 h-full">
                <div
                  id="title"
                  class="row-span-1 font-mono font-semibold text-xl text-center"
                >
                  <div class="inline-block">{pokeId}</div>
                  <div class="inline-block">{pokeName}</div>
                </div>
                <div id="body" class="row-span-6 shadow rounded-lg bg-blue-100">
                  <img src={pokeImg} alt={pokeName} />
                </div>
                <div id="footer" class="row-span-1 space-x-1">
                  {#each pokeTypes as types}
                    <div
                      class="rounded-2xl bg-green-800 text-white text-xs px-2 shadow inline-block font-medium"
                    >
                      {types}
                    </div>
                  {/each}
                  <div class="float-right my-auto">
                    {#if pokeSaved || pokeAdded}
                      <div>✔</div>
                    {:else}
                      <button class="border-none " on:click={savePoke}
                        >➕</button
                      >
                    {/if}
                  </div>
                </div>
              </div>
            </div>

            {#if pokeAdded}
              <div class="block text-center mt-2 text-red-400">
                {pokeMsg}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  .poke-card {
    height: 325px;
    width: 270px;
  }
</style>
