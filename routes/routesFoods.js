import { Router } from "express";
import { foodController } from "../controllers/foodController.js";

export const foodsRouter = Router();

foodsRouter.get("/", foodController.getAll);

foodsRouter.get("/:id", foodController.getById);

foodsRouter.post("/", foodController.create);

foodsRouter.delete("/:id", foodController.delete);

foodsRouter.patch("/:id", foodController.update);
