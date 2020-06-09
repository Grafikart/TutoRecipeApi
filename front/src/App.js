import React, {useEffect, useState} from 'react'
import {LoginForm} from './LoginForm'
import {apiFetch} from './utils/api'

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
      {user ? 'Bienvenue ' + user.email : <LoginForm onSuccess={setUser}/>}
    </div>
  );
}

export default App;
