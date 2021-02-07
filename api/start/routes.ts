import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')

Route.group(() => {
  // Profil
  Route.get('me', 'AuthController.me')

  // Ingrédients
  Route.get('ingredients', 'IngredientsController.index')
  Route.post('ingredients', 'IngredientsController.store')
  Route.put('ingredients/:id', 'IngredientsController.update')
  Route.delete('ingredients/:id', 'IngredientsController.delete')
}).middleware(['auth'])
