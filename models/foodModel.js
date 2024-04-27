import foods from "../foods.json" with {type: 'json'}
import {randomUUID} from 'crypto'

export class FoodModel {
    static async getAll({ typeFood }) {
        if (typeFood) {
            const foodByType= foods.filter((food) =>
                food.foodType.some((g) => g.toLowerCase() === foodType.toLowerCase())
            
            
            );
            if (foodByType.length === 0) {
                return res.status(404).send("Food not found");
            }
            return foodByType
        }
        return foods
    }


    static async getById({ id }) {
        const food = foods.find((food) => food.foodId === id);

        return food
    }


    static async create({ input }) {
        const food = foods.find((food) => food.name === input.name);
        if (food) {
            return res.status(409).json({ error: "Food already exists" });
         }
         const newFood = {
            foodId: randomUUID(),
            ...input
        };

        foods.push(newFood);
    }

    static async delete({ id }) {

        const foodIndex = foods.findIndex((food) => food.foodId === id);

        if (foodIndex === -1) return false

        foods.splice(foodIndex, 1);
        return true;
    
    }

    static async update({ id, input}) {

        const foodIndex = foods.findIndex((food) => food.foodId === id);

        if (foodIndex === -1) {
            return res.status(404).json({ message: "Food not found" });
        }

        const updateFood = {
            ...foods[foodIndex],
            ...input
        }

       return foods[foodIndex] = updateFood;

    }


}