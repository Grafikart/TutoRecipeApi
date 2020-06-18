import React, {useEffect, useState} from 'react'
import {LoginForm} from './components/LoginForm'
import {apiFetch} from './utils/api'
import {Site} from './components/Site'

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
      user ? <Site /> : <LoginForm onSuccess={setUser}/>
  );
}

export default App;
