import {apiFetch} from '../utils/api'
import {useCallback, useReducer} from 'react'

function reducer (state, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {...state, loading: true}
    case 'ERRORS':
      return {...state, errors: action.errors, loading: false}
    case 'DATA':
      return {...state, data: action.data, loading: false, errors: {}}
  }
}

export const useApiFetch = function () {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    errors: {}
  })

  const doFetch = useCallback(async function (endpoint, options) {
    dispatch({type: 'START_LOADING'})
    try {
      const data = await apiFetch(endpoint, options)
      if (data) {
        dispatch({type: 'DATA', data})
        return data
      }
    } catch (e) {
      dispatch({
        type: 'ERRORS', errors: e.errors.reduce(function (acc, error) {
          acc[error.field] = error.message
          return acc
        }, {})
      })
      throw e
    }
  }, [])

  return {
    errors: state.errors,
    loading: state.loading,
    data: state.data,
    setData: function (data) { dispatch({type: 'DATA', data}) },
    doFetch
  }
}
