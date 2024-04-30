import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '194757616',
    database: 'foods',
}

const connection = await mysql.createConnection(config);
export class FoodModel {



    static async getAll({ typeFood }) {
        const [allFoods] = await connection.query(
            `SELECT foods.id_food, foods.name_food, foods.servingSize, foods.calories, foods.PICTURE, types_food.name_type
        FROM foods 
        JOIN food_types  ON foods.id_food = food_types.id_food
        JOIN types_food  ON food_types.id_name = types_food.id;`,

        )
        return allFoods


    }


    static async getById({ id }) {
        const [foodById] = await connection.query(
            `SELECT foods.id_food, foods.name_food, foods.servingSize, foods.calories, foods.PICTURE, types_food.name_type
        FROM foods 
        JOIN food_types  ON foods.id_food = food_types.id_food
        JOIN types_food  ON food_types.id_name = types_food.id WHERE foods.id_food = ?;`, [id],

        )
        return foodById

    }


    static async create({ input }) {
        const { name, servingSize, calories,foodType, picture } = input;


    
        await connection.query(
            `INSERT INTO foods(name_food, servingSize, calories, PICTURE) 
            VALUES (?, ?, ?, ?)`,
            [name, servingSize, calories, picture]
        );
    
        const [newFood] = await connection.query(
            `SELECT * FROM foods WHERE name_food = ?`,
            [name]
        );
    
        return newFood;
    }
    

    static async delete({ id }) {



    }

    static async update({ id, input }) {

        const [foodById] = await connection.query(
            `SELECT foods.id_food, foods.name_food, foods.servingSize, foods.calories, foods.PICTURE, types_food.name_type
        FROM foods 
        JOIN food_types  ON foods.id_food = food_types.id_food
        JOIN types_food  ON food_types.id_name = types_food.id WHERE foods.id_food = ?;`, id,

        )
        return foodById

    }


}