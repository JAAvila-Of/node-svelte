import { Schema } from "mongoose";

export const pokeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    alias: {
      type: String,
    },
    types: [
      {
        type: String,
        required: true,
      },
    ],
    poster: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
