import type { IPokeData } from "../models/pokeData.model";

const api = "http://localhost:4000/api/pokes";

export interface IResponseData {
  status: number;
  data?: any;
}

export interface IAlias {
  alias: string;
}

let responsePokes: IResponseData;

export const addPokes = async (poke: IPokeData): Promise<IResponseData> => {
  const sendPoke = await fetch(api, {
    method: "POST",
    body: JSON.stringify(poke),
    headers: {
      "Content-Type": "application/json",
    },
  });

  responsePokes = {
    status: sendPoke.status,
    data: await sendPoke.json(),
  };

  return responsePokes;
};

export const getPokes = async (p: number): Promise<IResponseData> => {
  const getPokes = await fetch(`${api}?page=${p}`, {
    method: "GET",
  });

  responsePokes = {
    status: getPokes.status,
    data: await getPokes.json(),
  };

  return responsePokes;
};

export const updatePokes = async (
  id: string,
  data: IAlias
): Promise<IResponseData> => {
  const updatePokes = await fetch(`${api}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  responsePokes = {
    status: updatePokes.status,
    data: await updatePokes.json(),
  };

  return responsePokes;
};

export const removePoke = async (id: string): Promise<IResponseData> => {
  const removed = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });

  responsePokes = {
    status: removed.status,
    data: await removed.json(),
  };

  return responsePokes;
};
