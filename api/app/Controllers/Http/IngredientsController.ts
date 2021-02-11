import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'
import IngredientValidator from 'App/Validators/IngredientValidator'

export default class IngredientsController {
  public index() {
    return Ingredient.all()
  }

  public show({ params }: HttpContextContract) {
    return Ingredient.findOrFail(params.id)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(IngredientValidator)
    const ingredient = await Ingredient.create(payload)

    return response.created(ingredient)
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(IngredientValidator)
    const ingredient = await Ingredient.findOrFail(params.id)

    return ingredient.merge(payload).save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const ingredient = await Ingredient.query()
      .doesntHave('recipes')
      .where('id', params.id)
      .firstOrFail()

    await ingredient.delete()

    return response.noContent()
  }
}
