import {useCallback, useMemo, useReducer} from 'react'
import {apiFetch} from '../utils/api'

export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST'
export const FETCH_RECIPES_RESPONSE = 'FETCH_RECIPES_RESPONSE'
export const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR'
export const FETCH_RECIPE_REQUEST = 'FETCH_RECIPE_REQUEST'
export const FETCH_RECIPE_RESPONSE = 'FETCH_RECIPE_RESPONSE'
export const DESELECT_RECIPE = 'DESELECT_RECIPE'
export const SELECT_RECIPE = 'SELECT_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'
export const ADD_RECIPE = 'ADD_RECIPE'

const recipesReducer = function (state, action) {
  console.log('RECIPES REDUCE', action.type, action)
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return {...state, loading: true}
    case FETCH_RECIPES_ERROR:
      return {...state, loading: false, error: action.payload}
    case FETCH_RECIPES_RESPONSE:
      return {...state, loading: false, recipes: action.payload}
    case FETCH_RECIPE_REQUEST:
      return {...state,
        selectedRecipeId: action.id,
        recipes: state.recipes.map(r => r.id === action.id ? {...r, loading: true} : r)
      }
    case FETCH_RECIPE_RESPONSE:
      return {...state,
        selectedRecipeId: action.id,
        recipes: state.recipes.map(r => r.id === action.id ? action.payload : r)
      }
    case DESELECT_RECIPE:
      return {...state, selectedRecipeId: null}
    case SELECT_RECIPE:
      return {...state, selectedRecipeId: action.payload}
    case UPDATE_RECIPE:
      return {...state, recipes: state.recipes.map(r => r === action.target ? {...r, ...action.payload} : r)}
    case ADD_RECIPE:
      if (state.recipes === null) {
        return state
      }
      return {...state, recipes: [...state.recipes, action.payload]}
  }
}

export function useRecipes () {
  const [state, dispatch] = useReducer(recipesReducer, {
    loading: false,
    error: null,
    recipes: null,
    selectedRecipeId: null,
  })

  const recipe = useMemo(() => {
    if (!Array.isArray(state.recipes)) {
      return null
    }
    for (let r of state.recipes) {
      if (r.id === state.selectedRecipeId) {
        return r
      }
    }
  }, [state.recipes, state.selectedRecipeId])

  return {
    ...state,
    selectedRecipe: recipe,
    fetchRecipes: useCallback(async function () {
      if (state.recipes !== null) {
        return null;
      }
      dispatch({type: FETCH_RECIPES_REQUEST})
      const data = await apiFetch('/recipes')
      dispatch({type: FETCH_RECIPES_RESPONSE, payload: data})
    }, [state.recipes]),
    fetchRecipe: useCallback(async function (recipe) {
      if (recipe.ingredients) {
        dispatch({type: SELECT_RECIPE, payload: recipe.id})
      } else {
        dispatch({type: FETCH_RECIPE_REQUEST, id: recipe.id})
        const data = await apiFetch('/recipes/' + recipe.id)
        dispatch({type: FETCH_RECIPE_RESPONSE, payload: data, id: recipe.id})
      }
    }, []),
    unselectRecipe: useCallback(() => dispatch({type: DESELECT_RECIPE}), []),
    updateRecipe: useCallback((recipe, newRecipe) => dispatch({type: UPDATE_RECIPE, target: recipe, payload: newRecipe}), []),
    createRecipe: useCallback(async function (data) {
      const recipe = await apiFetch('/recipes', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      dispatch({type: 'ADD_RECIPE', payload: recipe})
    })
  }
}

