import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Ingredient from 'App/Models/Ingredient'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public short?: string

  @manyToMany(() => Ingredient)
  public ingredients: ManyToMany<typeof Ingredient>
}
