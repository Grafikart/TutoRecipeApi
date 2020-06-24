import React, {useEffect, useState} from 'react'
import {NavBar} from './NavBar'
import {Ingredients} from './Ingredients'
import {RecipeDetail, Recipes} from './recipes/Recipes'
import {RecipeCreate} from './recipes/RecipeForm'
import {useRecipes, useSite} from '../hooks/site'
import {useIngredients} from '../hooks/ingredients'

export const Site = function () {
  const [page, setPage] = useState('new')
  const {
    recipes,
    selectedRecipe,
    fetchRecipes,
    createRecipe,
    fetchRecipe,
    unselectRecipe,
    updateRecipe
  } = useRecipes()
  const {
    ingredients,
    fetchIngredients,
    updateIngredient,
    createIngredient,
    deleteIngredient
  } = useIngredients()

  let content = []
  if (page === 'recipes') {
    content.push(<Recipes key="recipes" recipes={recipes} selectedRecipe={selectedRecipe} onClick={fetchRecipe}
                          onModalClose={unselectRecipe}/>)
    if (selectedRecipe) {
      content.push(<RecipeDetail
        key={'recipe' + selectedRecipe.id}
        recipe={selectedRecipe}
        ingredients={ingredients}
        onUpdate={updateRecipe}
        onEdit={fetchIngredients}
        onClose={unselectRecipe}/>)
    }
  } else if (page === 'ingredients') {
    content = <Ingredients ingredients={ingredients} onUpdate={updateIngredient} onCreate={createIngredient} onDelete={deleteIngredient}/>
  } else if (page === 'new') {
    content = <RecipeCreate onSubmit={createRecipe} ingredients={ingredients}/>
  }

  // Au chargement
  useEffect(() => {
    if (page === 'recipes') {
      fetchRecipes()
    } else {
      fetchIngredients()
    }
  }, [page])

  return <>
    <NavBar page={page} onPageChange={setPage} title="Recettes"/>
    <div className="container">{content}</div>
  </>
}
