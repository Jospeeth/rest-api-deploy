import { FoodModel } from "../models/foodModel.js";
import { validateFood, validatePartialFood } from "../schemas/schemaFood.js";

export class foodController {
  static async getAll(req, res) {
    const { type } = req.query;
    const foods = await FoodModel.getAll({ type });
    res.json(foods);
  };

  static async getById(req, res) {
    const { id } = req.params;
    const food = await FoodModel.getById({ id });
    if (food) return res.json(food);
    res.status(404).send("Food not found");
  }

  static async create(req, res) {
    const result = validateFood(req.body);
    const foods = await FoodModel.getAll(result.data.foodType);
    const food = foods.find((food) => food.name === result.data.name);
    if (food) {
      return res.status(409).json({ error: "Food already exists" });
    }

    const newFood = await FoodModel.create({ input: result.data });
    
    res.status(201).json({food: newFood});



  }


  static async delete(req, res) {
    const { id } = req.params;
    const result = await FoodModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.json({ message: "Food deleted" });
  }
  static async update(req, res) {
    const result = validatePartialFood(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const { id } = req.params;
    const updateFood = await FoodModel.update({ id, input: result.data })

    return res.json(updateFood);
  }
}