import React, {useEffect, useState} from 'react'
import {LoginForm} from './components/LoginForm'
import {Ingredients} from './components/Ingredients'
import {apiFetch} from './utils/api'
import {RecipeCreate} from './components/recipes/RecipeCreate'

function App() {
  const [user, setUser] = useState(null)

  useEffect(function () {
    (async function () {
      try {
        const user = await apiFetch('/me')
        setUser(user)
      } catch (e) {
        setUser(false)
      }
    })()
  }, [])

  if (user === null) {
    return null;
  }

  return (
    <div className="container mt-4">
      {user ? <>
        <RecipeCreate />
        <Ingredients />
      </> : <LoginForm onSuccess={setUser}/>}
    </div>
  );
}

export default App;
