import Ingredient from "App/Models/Ingredient";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IngredientValidator from "App/Validators/IngredientValidator";

export default class IngredientsController {

    async index () {
        return Ingredient.all()
    }

    async read ({params}: HttpContextContract) {
        return Ingredient.findOrFail(params.id)
    }

    async store ({request}: HttpContextContract) {
        const data = await request.validate(IngredientValidator)
        return await Ingredient.create(data)
    }

    async update ({request, params}: HttpContextContract) {
        const data = await request.validate(IngredientValidator)
        const ingredient = await Ingredient.findOrFail(params.id)
        ingredient.merge(data)
        await ingredient.save()
        return ingredient
    }

    async delete ({params}: HttpContextContract) {
        const ingredient = await Ingredient.findOrFail(params.id)
        const recipe = await ingredient.related('recipes').query().first()
        if (recipe) {
            throw new Error(`Cet ingrédient est utilisé pour la recette '${recipe.title}'`);
        }
        await ingredient.related('recipes').detach()
        await ingredient.delete()
        return null
    }

}
