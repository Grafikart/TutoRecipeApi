import {API_URL} from '../config'

/**
 * @param {string} url
 * @param {object} options
 */
export async function apiFetch (endpoint, options) {
  const response = await fetch(API_URL + endpoint, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...options
  })
  if (response.status === 204) {
    return null
  }
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    if (Array.isArray(responseData.errors)) {
      throw responseData.errors.reduce(function (acc, error) {
        acc[error.field] = error.message
        return acc
      }, {})
    }
    throw responseData
  }
}

/**
 * @param {HTMLFormElement} element
 * @return {string}
 */
export function formToJson(element) {
  return JSON.stringify(formToObject(element))
}

export function formToObject(element) {
  return Object.fromEntries(new FormData(element))
}
