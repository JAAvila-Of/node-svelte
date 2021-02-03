import { Router } from "express";
import * as pokesCtr from "../controllers/pokes.controller";

const route = Router();

route.get("/api/pokes", pokesCtr.getPokes);
route.post("/api/pokes", pokesCtr.addPokes);
route.put("/api/pokes/:id", pokesCtr.editPokes);
route.delete("/api/pokes/:id", pokesCtr.removePokes);

export default route;
