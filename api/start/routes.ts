import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')

Route.group(() => {
  // Profil
  Route.get('me', 'AuthController.me')

  // Ingrédients
  Route.resource('ingredients', 'IngredientsController').apiOnly()
}).middleware(['auth'])
