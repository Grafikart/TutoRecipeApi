import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class IngredientValidator {
  constructor (private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [
      rules.unique({
        table: 'ingredients',
        column: 'title',
        whereNot: this.ctx.params.id ? {id: this.ctx.params.id} : undefined
      })
    ]),
    unit: schema.string.optional({}, [])
  });

  public messages = {}
}
