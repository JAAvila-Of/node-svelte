import { getPoke } from "../services/pokeService";

export let pokeValue: string = "";

export let pokeName: string = "Snorlax";
export let pokeId: number = 143;
export let pokeImg: string =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png";
export let pokeTypes: Array<string> = ["Normal"];

export let pokeFound: boolean = true;
export let pokeError: string = "";
export let pokeTrans = false;

export const searchPoke = async () => {
  const pokeResult = await getPoke(pokeValue);

  if (pokeResult.status === 200) {
    pokeName = pokeResult.data.name;
    pokeId = pokeResult.data.id;
    pokeImg = pokeResult.data.sprites.other["official-artwork"].front_default;
    pokeTypes = pokeResult.data.types.map((type) => {
      return type.type.name;
    });
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
};
