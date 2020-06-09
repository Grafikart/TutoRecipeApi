import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ingredients extends BaseSchema {
  public async up () {
    this.schema.createTable('ingredients', (table) => {
      table.increments('id')
      table.string('title').notNullable().unique()
      table.string('unit').nullable()
    })
    this.schema.createTable('recipes', (table) => {
      table.increments('id')
      table.string('title').notNullable().unique(),
      table.text('content')
      table.timestamps(true)
    })
    this.schema.createTable('ingredient_recipe', table => {
      table.integer('recipe_id').unsigned()
      table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE')
      table.integer('ingredient_id').unsigned()
      table.foreign('ingredient_id').references('ingredients.id').onDelete('CASCADE')
      table.float('quantity')
    })
  }

  public async down () {
    this.schema.dropTable('ingredients')
    this.schema.dropTable('recipes')
    this.schema.dropTable('ingredient_recipe')
  }
}
