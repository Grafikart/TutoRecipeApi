import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
  public index() {
    return Recipe.query().select(['id', 'title', 'short'])
  }
}
