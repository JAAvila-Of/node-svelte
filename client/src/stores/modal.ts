import { writable } from "svelte/store";

interface dataStore {
  pokeName: string;
  pokeAlias: string;
  poke_id: string;
}

export const modalState = writable<dataStore>({
  pokeName: "",
  pokeAlias: "",
  poke_id: "",
});
