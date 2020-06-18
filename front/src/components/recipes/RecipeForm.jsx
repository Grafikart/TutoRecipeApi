import React, {forwardRef, useEffect, useReducer, useRef, useState} from 'react'
import {Field} from '../../ui/Field'
import {Button} from '../../ui/Button'
import {apiFetch} from '../../utils/api'
import {Select} from '../ingredients/Select'
import {useApiFetch} from '../../hooks/api'
import {Trash} from '../../ui/Icons'

export const Fetch = function ({endpoint, children, ...props}) {
  const [data, setData] = useState(null)

  useEffect(function () {
    apiFetch(endpoint).then(setData)
  }, [])

  if (data === null) {
    return <div>Chargement...</div>
  }
  return children({data, ...props})
}

export const RecipeCreate = function ({onSubmit}) {

  const form = useRef(null)
  const {loading, errors, data, doFetch} = useApiFetch()

  const handleSubmit = async function (data) {
    doFetch('/recipes', {
      method: 'post',
      body: JSON.stringify(data)
    }).then(data => {
      form.current.reset()
      if (onSubmit) {
        onSubmit(data)
      }
    })
  }

  return <Fetch endpoint="/ingredients">
    {({data: ingredients}) => <RecipeForm
      ref={form}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      errors={errors}
      loading={loading}/>}
  </Fetch>
}

export const RecipeEdit = function ({recipe, onSubmit}) {

  const form = useRef(null)
  const {loading, errors, data, doFetch} = useApiFetch()

  const handleSubmit = async function (data) {
    doFetch('/recipes/' + recipe.id, {
      method: 'put',
      body: JSON.stringify(data)
    }).then(data => {
      if (onSubmit) {
        onSubmit(data)
      }
    })
  }

  return <Fetch endpoint="/ingredients">
    {({data: ingredients}) => <RecipeForm
      ref={form}
      recipe={recipe}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      errors={errors}
      loading={loading}/>}
  </Fetch>
}

function ingredientsReducer (state, action) {
  switch (action.type) {
    case 'RESET':
      return []
    case 'ADD_INGREDIENT':
      return [...state, {ingredient: action.ingredient, quantity: 0}]
    case 'UPDATE_QUANTITY':
      return state.map(i => {
        if (i.ingredient === action.ingredient) {
          return {ingredient: action.ingredient, quantity: parseFloat(action.quantity)}
        }
        return i
      })
    case 'REMOVE_INGREDIENT':
      return state.filter(i => i.ingredient !== action.ingredient)
    default:
      return state
  }
}

const RecipeIngredientRow = function ({ingredient, quantity, onChange, onDelete}) {
  return <div className="d-flex align-items-center mb-3">
    <div className="mr-2">{ingredient.title}</div>
    <Field className="mb-0" defaultValue={quantity} placeholder="quantité" onChange={e => onChange(ingredient, e.target.value)} required/>
    <div className="ml-2">{ingredient.unit}</div>
    <Button className="ml-2" type="danger" onClick={e => onDelete(ingredient)}>
      <Trash/>
    </Button>
  </div>
}

const RecipeForm = forwardRef(function ({ingredients, onSubmit, loading, errors, recipe = {}}, ref) {

  const [recipeIngredients, dispatch] = useReducer(ingredientsReducer, recipe.ingredients || [])

  const handleChange = function (ingredient) {
    dispatch({type: 'ADD_INGREDIENT', ingredient})
  }

  const handleChangeQuantity = function (ingredient, quantity) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      ingredient,
      quantity
    })
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.ingredients = recipeIngredients.reduce((acc, i) => {
      acc.push({id: i.ingredient.id, quantity: i.quantity})
      return acc
    }, [])
    onSubmit(data)
  }

  const handleReset = function () {
    dispatch({type: 'RESET'})
  }

  const handleDeleteIngredient = function (ingredient) {
    dispatch({type: 'REMOVE_INGREDIENT', ingredient})
  }

  const filteredIngredients = ingredients.filter(ingredient => {
    return !recipeIngredients.some(i => i.ingredient === ingredient)
  })

  return <form className="mb-5" onSubmit={handleSubmit} ref={ref} onReset={handleReset}>
    <h1>Créer une nouvelle recette</h1>
    <div className="row mb-2">
      <div className="col-md-6">
        <Field name="title" error={errors.title} defaultValue={recipe.title} required>Titre</Field>
        <Field name="content" error={errors.content} defaultValue={recipe.content}  type="textarea" required>Description</Field>
      </div>
      <div className="col-md-6">
        <h3>Ingrédients</h3>
        {recipeIngredients.map(i => <RecipeIngredientRow
          key={i.ingredient.id}
          ingredient={i.ingredient}
          quantity={i.quantity}
          onChange={handleChangeQuantity}
          onDelete={handleDeleteIngredient}
        />)}
        <div className="d-flex">
          <Select ingredients={filteredIngredients} onChange={handleChange} value={''}/>
        </div>
      </div>
    </div>
    <Button type="submit" loading={loading}>Enregistrer</Button>
  </form>
})
