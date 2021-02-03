import { RequestHandler } from "express";
import { PokesModel } from "../models/pokes";

export const getPokes: RequestHandler = async (req, res) => {
  const page = Number(req.query.page) || 1;

  const pokesFound = await PokesModel.paginate({}, { limit: 6, page });
  return !pokesFound
    ? res.status(401).json({ message: "No Pokes found" })
    : res.status(201).json(pokesFound);
};

export const addPokes: RequestHandler = async (req, res) => {
  try {
    const pokes = new PokesModel(req.body);
    const pokesSave = await pokes.save();

    return !pokesSave
      ? res.status(302).json({ message: "Something goes wrong!" })
      : res.status(201).json(pokesSave);
  } catch (e) {
    if (e.keyValue.name) {
      return res
        .status(303)
        .json({ message: `El Pokemón ${e.keyValue.name} ya esta registrado!` });
    }
    return res.status(303).json(e);
  }
};

export const editPokes: RequestHandler = async (req, res) => {
  const pokeId = req.params.id;

  if (!pokeId) return res.status(404).json({ message: "PokeId not provided" });

  const pokeEdited = await PokesModel.findByIdAndUpdate(pokeId, req.body, {
    new: true,
  });

  return !pokeEdited
    ? res.status(403).json({ message: "Something goes wrong!" })
    : res.status(201).json(pokeEdited);
};

export const removePokes: RequestHandler = async (req, res) => {
  const pokeId = req.params.id;

  if (!pokeId) return res.status(404).json({ message: "PokeId not provided" });

  const pokeRemoved = await PokesModel.findByIdAndDelete(pokeId);

  return !pokeRemoved
    ? res.status(403).json({ message: "Something goes wrong!" })
    : res.status(201).json(pokeRemoved);
};
