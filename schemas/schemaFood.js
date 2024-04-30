import zod from "zod"
const foodSchema = zod.object({
    name:zod.string(
        {
            invalid_type_error: 'Title must be a string',
            required_error: 'Title is required'
        }
    ),
    servingSize: zod.number().min(0).max(1000),
    calories: zod.number().positive(),
    foodType: zod.enum(["italiana", "mexicana", "china", "japonesa", "india", "francesa", "mediterránea", "americana", "vegetariana", "vegana"]).optional(),
    picture: zod.string().url({
        message: 'Poster must be a valid URL'
    }),

})

function validateFood(input) {
    return foodSchema.safeParse(input)
}


function validatePartialFood(input) {
    return foodSchema.partial().safeParse(input)
}

export { validateFood, validatePartialFood }