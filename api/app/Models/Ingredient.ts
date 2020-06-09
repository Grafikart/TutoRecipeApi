import { BaseModel, column, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Recipe from './Recipe'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public unit: string
  
  @computed()
  public get quantity () {
    return this.$extras.pivot_quantity
  }

  @manyToMany(() => Recipe)
  public recipes: ManyToMany<typeof Recipe>
}
