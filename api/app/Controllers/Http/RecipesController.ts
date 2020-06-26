// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Recipe from "App/Models/Recipe";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecipeValidator from "App/Validators/RecipeValidator";

export default class RecipesController {

    public async index () {
        return await Recipe.query().select(['id', 'title', 'short'])
    }

    public async read ({params}: HttpContextContract) {
        const recipe = await Recipe.findOrFail(params.id)
        await recipe.preload('ingredients', (query) => {
            query.pivotColumns(['quantity'])
          })
        return recipe
    }

    public async store ({request}: HttpContextContract) {
        const data = await request.validate(RecipeValidator)
        const recipe = await Recipe.create(data)
        await recipe.related('ingredients').attach(
            data.ingredients.reduce((acc, ingredient) => {
                acc[ingredient.id] = {
                    quantity: ingredient.quantity
                }
                return acc
            }, {})
        )
        return recipe
    }

    public async update ({request, params}: HttpContextContract) {
        const data = await request.validate(RecipeValidator)
        const recipe = await Recipe.findOrFail(params.id)
        recipe.merge(data)
        await recipe.save()
        await recipe.related('ingredients').sync(
            data.ingredients.reduce((acc, ingredient) => {
                acc[ingredient.id] = {
                    quantity: ingredient.quantity
                }
                return acc
            }, {})
        )
        await recipe.preload('ingredients', (query) => {
            query.pivotColumns(['quantity'])
          })
        return recipe
    }

    public async delete ({params}: HttpContextContract) {
        const recipe = await Recipe.findOrFail(params.id)
        await recipe.related('ingredients').detach()
        await recipe.delete()
        return null
    }

}
