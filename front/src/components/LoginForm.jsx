import React, {useState} from 'react'
import {Button} from '../ui/Button'
import {API_URL} from '../config'
import {AlertErrors} from '../ui/Alert'

export function LoginForm ({onSuccess}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSubmit = async function (e) {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const body = JSON.stringify(Object.fromEntries(data))
    const response = await fetch(API_URL + '/login', {
      body,
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()
    if (response.ok) {
      onSuccess(responseData)
    } else {
      setErrors(responseData.errors)
    }
    setLoading(false)
  }

  return <form className="container my-4" onSubmit={handleSubmit}>
    <AlertErrors errors={errors.map(e => e.message)} />
    <div className="form-group">
      <label htmlFor="email">Nom d'utilisateur</label>
      <input type="text" name="email" className="form-control" required/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" className="form-control" required/>
    </div>
    <Button type="submit" loading={loading}>Se connecter</Button>
  </form>
}
