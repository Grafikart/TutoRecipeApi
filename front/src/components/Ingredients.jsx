import React from 'react'
import {IngredientRow} from './ingredients/IngredientRow'
import {IngredientCreate} from './ingredients/IngredientCreate'

export function Ingredients ({ingredients, onUpdate, onCreate, onDelete}) {

  return <div>
    <h2>Gérer les ingrédients</h2>
    {ingredients === null ?
      <div>Chargement...</div> :
      <div>
        {ingredients.map(ingredient => <IngredientRow ingredient={ingredient} key={ingredient.id} onUpdate={onUpdate} onDelete={onDelete}/>)}
        <IngredientCreate onCreate={onCreate}/>
      </div>
    }
  </div>
}
