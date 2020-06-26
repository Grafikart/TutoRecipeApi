import React, {useState} from 'react'
import {RecipeEdit} from './RecipeForm'
import {Modal} from '../Modal'
import {Loader} from '../../ui/Loader'

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
  const handleClick = function (e) {
    e.preventDefault()
    onClick(recipe)
  }

  return <div className="card">
    <div className="card-body">
      <h5 className="card-title">{recipe.title}</h5>
      <p className="card-text">{recipe.short}</p>
      <a href="#" className="btn btn-primary" onClick={handleClick}>Voir la recette</a>
    </div>
  </div>

}

export function RecipeDetail ({recipe, onClose, onUpdate, onEdit, ingredients}) {
  const [view, setView] = useState('view')
  const handleUpdate = function (data) {
    onUpdate(recipe, data)
    setView('view')
  }

  const toggleEdit = function () {
    setView('edit')
    onEdit()
  }

  const htmlContent = {__html: (recipe.content || '').split('\n').join('<br/>')}

  return <Modal onClose={onClose} title={recipe.title}>
    {view === 'view' ? <>
        <p className="card-text" dangerouslySetInnerHTML={htmlContent}/>
        {recipe.loading && <Loader/>}
        {recipe.ingredients && <ul>
          {recipe.ingredients.map(ingredient => <li key={ingredient.id}>
            <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.title}
          </li>)}
        </ul>
        }
        <p className="btn btn-primary" onClick={toggleEdit}>Editer</p>
      </> :
      <RecipeEdit recipe={recipe} ingredients={ingredients} onSubmit={handleUpdate}/>
    }
  </Modal>
}
