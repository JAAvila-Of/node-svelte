import type { IPokeData } from "./pokeData.model";

export interface IPokedex {
  docs: Array<IPokeData>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}
