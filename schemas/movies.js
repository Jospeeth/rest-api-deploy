const  zod = require("zod");
const movieSchema = zod.object({
    title: zod.string(
        {invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'}
    ),
    year: zod.number().int().min(1950).max(2025),
    director: zod.string(),
    duration: zod.number().int().positive(),
    poster: zod.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: zod.array(zod.enum(['Action', 'Drama', 'Comedy', 'Fantasy', 'Adventure', 'Horor', 'Action', 'Sci-Fi', 'Crime']),
    {
        invalid_type_error: 'Genre must be an array of strings',
        required_error: 'Genre is required'
    }
    ),
    rate: zod.number().min(0).max(10)

})

function validateMovie (input){
    return movieSchema.safeParse(input)
}


function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}

module.exports = {validateMovie, validatePartialMovie}