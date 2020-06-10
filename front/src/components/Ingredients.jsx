import React, {useEffect} from 'react'
import {IngredientRow} from './ingredients/IngredientRow'
import {useApiFetch} from '../hooks/api'
import {IngredientCreate} from './ingredients/IngredientCreate'

export function Ingredients () {

  const {loading, data: ingredients, doFetch, setData: setIngredients} = useApiFetch()
  useEffect(function () {
    doFetch('/ingredients')
  }, [])

  const handleUpdate = function (ingredient, newIngredient) {
    setIngredients(ingredients.map(i => i === ingredient ? newIngredient : i))
  }
  const handleDelete = function (ingredient) {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }
  const handleCreate = function (ingredient) {
    setIngredients([...ingredients, ingredient])
  }

  return <div>
    <h2>Gérer les ingrédients</h2>
    {loading ?
      <div>Chargement...</div> :
      <div>
        {ingredients && ingredients.map(ingredient => <IngredientRow ingredient={ingredient} key={ingredient.id} onUpdate={handleUpdate} onDelete={handleDelete}/>)}
        <IngredientCreate onCreate={handleCreate}/>
      </div>
    }
    {JSON.stringify(ingredients)}
  </div>
}
