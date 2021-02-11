import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  public register() {
    return User.create({
      email: 'user',
      password: 'secret',
    })
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)

    return auth.user
  }
}
