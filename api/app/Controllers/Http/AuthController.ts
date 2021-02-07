import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async me({ auth }: HttpContextContract) {
    return auth.user
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    await auth.attempt(email, password)

    return auth.user
  }
}
