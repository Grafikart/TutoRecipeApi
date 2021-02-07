import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ingredient from 'App/Models/Ingredient'
import IngredientValidator from 'App/Validators/IngredientValidator'

export default class IngredientsController {
  public index() {
    return Ingredient.all()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(IngredientValidator)

    return Ingredient.create(payload)
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(IngredientValidator)
    const ingredient = await Ingredient.findOrFail(params.id)

    return ingredient.merge(payload).save()
  }

  public async delete({ params }: HttpContextContract) {
    const ingredient = await Ingredient.query()
      .doesntHave('recipes')
      .where('id', params.id)
      .firstOrFail()

    await ingredient.delete()

    return null
  }
}
