import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'
import RecipeValidator, { RecipeData } from 'App/Validators/RecipeValidator'

export default class RecipesController {
  public index() {
    return Recipe.query().select(['id', 'title', 'short'])
  }

  public show({ params }: HttpContextContract) {
    return Recipe.query()
      .preload('ingredients', (query) => {
        query.pivotColumns(['quantity'])
      })
      .where('id', params.id)
      .firstOrFail()
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(RecipeValidator)
    const recipe = await Recipe.create(payload)

    const computedIngredients = this.computeIngredients(payload)
    await recipe.related('ingredients').attach(computedIngredients)

    return response.created(recipe)
  }

  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(RecipeValidator)
    const recipe = await Recipe.findOrFail(params.id)

    await recipe.merge(payload).save()

    const computedIngredients = this.computeIngredients(payload)
    await recipe.related('ingredients').sync(computedIngredients)

    return recipe
  }

  public async destroy({ params, response }: HttpContextContract) {
    const recipe = await Recipe.findOrFail(params.id)
    await recipe.delete()

    return response.noContent()
  }

  private computeIngredients(payload: RecipeData) {
    return payload.ingredients.reduce((acc, { id, quantity }) => {
      acc[id] = { quantity }
      return acc
    }, {})
  }
}
