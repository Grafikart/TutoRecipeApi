import React, {forwardRef, useEffect, useReducer, useRef, useState} from 'react'
import {Field} from '../../ui/Field'
import {Button} from '../../ui/Button'
import {apiFetch} from '../../utils/api'
import {Select} from '../ingredients/Select'
import {Trash} from '../../ui/Icons'

export const RecipeCreate = function ({onSubmit, ingredients}) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const form = useRef(null)

  const handleSubmit = function (data) {
    setLoading(true)
    try {
      onSubmit(data)
      form.current.reset()
    } catch (e) {
      setErrors(e)
    }
    setLoading(false)
  }

  return <RecipeForm
      ref={form}
      ingredients={ingredients}
      onSubmit={handleSubmit}
      errors={errors}
      loading={loading}/>
}

export const RecipeEdit = function ({recipe, ingredients, onSubmit}) {

  const form = useRef(null)

  const handleSubmit = async function (data) {
    onSubmit(data)
    apiFetch('/recipes/' + recipe.id, {
      method: 'put',
      body: JSON.stringify(data)
    })
  }

  return <RecipeForm
      ref={form}
      recipe={recipe}
      ingredients={ingredients}
      onSubmit={handleSubmit}/>
}

function ingredientsReducer (state, action) {
  switch (action.type) {
    case 'RESET':
      return []
    case 'ADD_INGREDIENT':
      return [...state, {
        id: action.payload.id,
        quantity: 0,
        title: action.payload.title,
        unit: action.payload.unit
      }]
    case 'UPDATE_QUANTITY':
      return state.map(i => i === action.target ? {...i, quantity: action.payload} : i)
    case 'REMOVE_INGREDIENT':
      return state.filter(i => i !== action.payload)
    default:
      return state
  }
}

const RecipeIngredientRow = function ({ingredient, onChange, onDelete}) {
  return <div className="d-flex align-items-center mb-3">
    <div className="mr-2">{ingredient.title}</div>
    <Field className="mb-0" defaultValue={ingredient.quantity} placeholder="quantité" onChange={e => onChange(ingredient, e.target.value)} required/>
    <div className="ml-2">{ingredient.unit}</div>
    <Button className="ml-2" type="danger" onClick={e => onDelete(ingredient)}>
      <Trash/>
    </Button>
  </div>
}

const RecipeForm = forwardRef(function ({ingredients, onSubmit, loading, errors = {}, recipe = {}}, ref) {

  const [recipeIngredients, dispatch] = useReducer(ingredientsReducer, recipe.ingredients || [])

  const handleChange = function (ingredient) {
    dispatch({type: 'ADD_INGREDIENT', payload: ingredient})
  }

  const handleChangeQuantity = function (ingredient, quantity) {
    dispatch({
      type: 'UPDATE_QUANTITY',
      target: ingredient,
      payload: quantity
    })
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.ingredients = recipeIngredients
    onSubmit(data)
  }

  const handleReset = function () {
    dispatch({type: 'RESET'})
  }

  const handleDeleteIngredient = function (ingredient) {
    dispatch({type: 'REMOVE_INGREDIENT', payload: ingredient})
  }

  const filteredIngredients = (ingredients || []).filter(ingredient => {
    return !recipeIngredients.some(i => i.id === ingredient.id)
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
          key={i.id}
          ingredient={i}
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
