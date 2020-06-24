import React, {useEffect, useState} from 'react'
import {Fetch, RecipeEdit} from './RecipeForm'
import {Modal} from '../Modal'
import {Loader} from '../../ui/Loader'
import {apiFetch} from '../../utils/api'

export function Recipes ({recipes, selectedRecipe, onClick}) {

  if (recipes === null) {
    return <Loader>Chargement des recettes...</Loader>
  }

  return <div className="row">
    {recipes.map(recipe => <div className="col-md-4 mb-4" key={recipe.id}>
      <Recipe recipe={recipe} onClick={onClick} selectedRecipe={selectedRecipe}/>
    </div>)}
    {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onClose={() => null} onUpdate={() => null}/>}
  </div>
}

function Recipe ({recipe, onClick}) {
  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')}

  const handleClick = function (e) {
    e.preventDefault()
    onClick(recipe)
  }

  return <div className="card">
    <div className="card-body">
      <h5 className="card-title">{recipe.title}</h5>
      <p className="card-text" dangerouslySetInnerHTML={htmlContent}/>
      <a href="#" className="btn btn-primary" onClick={handleClick}>Voir la recette</a>
    </div>
  </div>

}

export function RecipeDetail ({recipe, onClose, onUpdate}) {
  const handleUpdate = function (recipe) {
    onUpdate(recipe)
    onClose()
  }

  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')}

  return <Modal onClose={onClose} title={recipe.title}>
    <p className="card-text" dangerouslySetInnerHTML={htmlContent}/>
    {recipe.loading && <Loader/>}
    {recipe.ingredients && <ul>
      {recipe.ingredients.map(ingredient => <li key={ingredient.id}>
        <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.title}
      </li>)}
    </ul>
    }
    <p className="btn btn-primary" onClick={() => null}>Editer</p>
  </Modal>
}
