import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shorts extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.text('short')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('short')
    })
  }
}
