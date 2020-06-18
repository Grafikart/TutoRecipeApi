import React, {useState} from 'react'
import {Fetch, RecipeEdit} from './RecipeForm'
import {Modal} from '../Modal'

export function Recipes () {
  return <>
    <Fetch endpoint="/recipes">
      {({data: recipes}) => <RecipesList recipes={recipes}/>}
    </Fetch>
  </>
}

function RecipesList ({recipes}) {
  return <div className="row">
    {recipes.map(recipe => <div className="col-md-4 mb-4" key={recipe.id}>
      <Recipe recipe={recipe}/>
    </div>)}
  </div>
}

function Recipe ({recipe: apiRecipe}) {

  const [recipe, setRecipe] = useState(apiRecipe)
  const [detailVisible, setDetailVisible] = useState(false)
  const showDetail = function (e) {
    e.preventDefault()
    if (detailVisible === false) {
      setDetailVisible(true)
    }
  }
  const hideDetail = function (e = null) {
    if (e) {
      e.preventDefault()
    }
    if (detailVisible === true) {
      setDetailVisible(false)
    }
  }
  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')}

  return <div className="card">
    <div className="card-body">
      <h5 className="card-title">{recipe.title}</h5>
      <p className="card-text" dangerouslySetInnerHTML={htmlContent}/>
      <a href="#" className="btn btn-primary" onClick={showDetail}>Voir la recette</a>
    </div>
    {detailVisible && <RecipeDetail recipe={recipe} onClose={hideDetail} onUpdate={setRecipe}/>}
  </div>

}

function RecipeDetail ({recipe, onClose, onUpdate}) {
  const handleUpdate = function (recipe) {
    onUpdate(recipe)
    onClose()
  }

  return <Modal onClose={onClose} title={recipe.title}>
    <Fetch endpoint={'/recipes/' + recipe.id}>
      {({data: recipe}) => <RecipeDetailBody recipe={recipe} onUpdate={handleUpdate}/>}
    </Fetch>
  </Modal>
}

function RecipeDetailBody ({recipe, onUpdate}) {
  const [state, setState] = useState('view')
  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')}
  const normalizedRecipe = {
    ...recipe, ingredients: recipe.ingredients.map(i => ({
      ingredient: i,
      quantity: i.quantity
    }))
  }
  const handleSubmit = function (recipe) {
    onUpdate(recipe)
    setState('view')
  }

  if (state === 'view') {
    return <>
      <p className="card-text" dangerouslySetInnerHTML={htmlContent}/>
      <ul>
        {recipe.ingredients.map(ingredient => <li key={ingredient.id}>
          <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.title}
        </li>)}
      </ul>
      <p className="btn btn-primary" onClick={() => setState('edit')}>Editer</p>
    </>
  }

  return <RecipeEdit recipe={normalizedRecipe} onSubmit={handleSubmit}/>
}
