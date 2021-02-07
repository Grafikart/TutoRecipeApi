import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login')

Route.group(() => {
  // Profil
  Route.get('/me', 'AuthController.me')
}).middleware(['auth'])
