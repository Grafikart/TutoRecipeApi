import React, {useEffect, useState} from 'react'
import {NavBar} from './NavBar'
import {Ingredients} from './Ingredients'
import {RecipeDetail, Recipes} from './recipes/Recipes'
import {RecipeCreate} from './recipes/RecipeForm'
import {useRecipes, useSite} from '../hooks/site'

export const Site = function () {
  const [page, setPage] = useState('recipes')
  const {
    recipes,
    selectedRecipe,
    fetchRecipes,
    fetchRecipe,
    unselectRecipe,
  } = useRecipes()

  let content = []
  if (page === 'recipes') {
    content.push(<Recipes key="recipes" recipes={recipes} selectedRecipe={selectedRecipe} onClick={fetchRecipe} onModalClose={unselectRecipe}/>)
    if (selectedRecipe) {
      content.push(<RecipeDetail key={'recipe' + selectedRecipe.id} recipe={selectedRecipe} onClose={unselectRecipe}/> )
    }
  }

  // Au chargement
  useEffect(() => {
      fetchRecipes()
  }, [])

  return <>
      <NavBar page={page} onPageChange={setPage} title="Recettes" />
      <div className="container">{content}</div>
    </>
}

function Content ({page, setPage}) {
  switch (page) {
    case 'recipes':
      return <Recipes />
    case 'ingredients':
      return <Ingredients/>
    case 'new':
      return <RecipeCreate onSubmit={() => setPage('recipes')}/>
    default:
      return null
  }
}
