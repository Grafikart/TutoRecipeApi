import {useReducer} from 'react'
import {apiFetch} from '../utils/api'

export const FETCH_INGREDIENT_REQUEST = 'FETCH_INGREDIENT_REQUEST'
export const FETCH_INGREDIENT_RESPONSE = 'FETCH_INGREDIENT_RESPONSE'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'

function reducer (state, action) {
  console.log('INGREDIENTS REDUCE', action.type, action)
  switch (action.type) {
    case FETCH_INGREDIENT_REQUEST:
      return {...state, loading: true}
    case FETCH_INGREDIENT_RESPONSE:
      return {...state, loading: false, ingredients: action.payload}
    case DELETE_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter(i => i !== action.payload)}
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]}
    case UPDATE_INGREDIENT:
      return {...state, ingredients: state.ingredients.map(i => i === action.target ? {...i, ...action.payload} : i)}
  }
}

export function useIngredients () {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    ingredients: null
  })

  return  {
    loading: state.loading,
    ingredients: state.ingredients,
    fetchIngredients: async function () {
      if (state.ingredients !== null) {
        return null
      }
      dispatch({type: FETCH_INGREDIENT_REQUEST})
      const data = await apiFetch('/ingredients')
      dispatch({type: FETCH_INGREDIENT_RESPONSE, payload: data})
    },
    deleteIngredient: async function (ingredient) {
      dispatch({type: DELETE_INGREDIENT, payload: ingredient})
      await apiFetch('/ingredients/' + ingredient.id, {
        method: 'delete'
      })
    },
    updateIngredient: async function (ingredient, data) {
      dispatch({type: UPDATE_INGREDIENT, target: ingredient, payload: data})
      await apiFetch('/ingredients/' + ingredient.id, {
        method: 'put',
        body: JSON.stringify(data)
      })
    },
    createIngredient: async function (data) {
      const ingredient = await apiFetch('/ingredients', {
        method: 'post',
        body: JSON.stringify(data)
      })
      dispatch({type: ADD_INGREDIENT, payload: ingredient})
    }
  }
}
