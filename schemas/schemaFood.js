import zod from "zod"
const foodSchema = zod.object({
    name: zod.string(
        {invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'}
    ),
    servingSize: zod.number().int().min(0).max(500),
    calories: zod.number().int().positive(),
    foodType: zod.string(),
    rate: zod.number().min(0).max(10),
    picture: zod.string().url({
        message: 'Poster must be a valid URL'
    }),

})

function validateFood (input){
    return foodSchema.safeParse(input)
}


function validatePartialFood(input){
    return foodSchema.partial().safeParse(input)
}

export {validateFood, validatePartialFood}