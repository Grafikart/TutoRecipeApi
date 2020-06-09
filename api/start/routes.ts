import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "Hello world";
})

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')

Route.group(() => {
  // Profil
  Route.get('/me', 'AuthController.me')

  // Recette
  Route.get('/recipes', 'RecipesController.index')
  Route.post('/recipes', 'RecipesController.store')
  Route.get('/recipes/:id', 'RecipesController.read')
  Route.put('/recipes/:id', 'RecipesController.update')
  Route.delete('/recipes/:id', 'RecipesController.delete')

  // Ingrédients
  Route.get('/ingredients', 'IngredientsController.index')
  Route.post('/ingredients', 'IngredientsController.store')
  Route.get('/ingredients/:id', 'IngredientsController.read')
  Route.put('/ingredients/:id', 'IngredientsController.update')
  Route.delete('/ingredients/:id', 'IngredientsController.delete')
}).middleware('auth')
