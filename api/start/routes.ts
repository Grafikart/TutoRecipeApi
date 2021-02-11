import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')
Route.get('register', 'AuthController.register')

Route.group(() => {
  // Profil
  Route.get('me', 'AuthController.me')

  // Recettes
  Route.resource('recipes', 'RecipesController').apiOnly()

  // Ingrédients
  Route.resource('ingredients', 'IngredientsController').apiOnly()
}).middleware(['auth'])
