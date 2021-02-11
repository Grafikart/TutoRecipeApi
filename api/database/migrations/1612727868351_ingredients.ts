import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ingredients extends BaseSchema {
  public async up() {
    this.schema.createTable('ingredients', (table) => {
      table.increments('id')
      table.string('title').notNullable().unique()
      table.string('unit')
      table.timestamps(true)
    })

    this.schema.createTable('recipes', (table) => {
      table.increments('id')
      table.string('title').notNullable().unique()
      table.text('content').notNullable()
      table.text('short')
      table.timestamps(true)
    })

    this.schema.createTable('ingredient_recipe', (table) => {
      table.float('quantity')
      table.integer('recipe_id').unsigned()
      table.integer('ingredient_id').unsigned()
      table.foreign('ingredient_id').references('ingredients.id').onDelete('CASCADE')
      table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable('ingredients')
    this.schema.dropTable('recipes')
    this.schema.dropTable('ingredient_recipe')
  }
}
