import { Document } from "mongoose";

export interface IPokesDocument extends Document {
  number: number;
  name: string;
  alias?: string;
  types: Array<string>;
  poster: string;
}
