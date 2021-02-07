import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public unit?: string

  @computed()
  public get quantity() {
    return this.$extras.pivot_quantity
  }

  @manyToMany(() => Recipe)
  public recipes: ManyToMany<typeof Recipe>
}
