import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RecipeValidator {
  constructor (private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [
      rules.unique({
        table: 'recipes',
        column: 'title',
        whereNot: this.ctx.params.id ? {id: this.ctx.params.id} : undefined
      })
    ]),
    content: schema.string(),
    ingredients: schema.array().members(
      schema.object().members({
        id: schema.number([rules.exists({table: 'ingredients', column: 'id'})]),
        quantity: schema.number(),
      })
    )
  });

  public messages = {}
}
