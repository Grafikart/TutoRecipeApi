import React, {useState} from 'react'
import {NavBar} from './NavBar'
import {Ingredients} from './Ingredients'
import {Recipes} from './recipes/Recipes'
import {RecipeCreate} from './recipes/RecipeForm'

export function Site () {
  const [page, setPage] = useState('recipes')

  return <>
      <NavBar page={page} onPageChange={setPage} title="Recettes" />
      <div className="container">
        <Content page={page} setPage={setPage}/>
      </div>
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
