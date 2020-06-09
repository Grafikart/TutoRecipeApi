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
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    throw responseData
  }
}
