import { Model, model, PaginateModel, Document } from "mongoose";
import { IPokesDocument } from "./document";
import { pokeSchema } from "./schema";
import mongoosePaginate from "mongoose-paginate-v2";

pokeSchema.plugin(mongoosePaginate);

export interface IMethods extends IPokesDocument {
  //aqui van los metodos del modelo
}

export interface IStatics extends Model<IMethods> {
  //aqui van los metodos estaticos del modelo
}

export interface IPlugins<T extends IMethods, S extends IStatics>
  extends PaginateModel<IMethods> {
  //aqui van los plugins
}

export const PokesModel: IPlugins<IMethods, IStatics> = model(
  "PokesModel",
  pokeSchema,
  "pokes_collection"
);
