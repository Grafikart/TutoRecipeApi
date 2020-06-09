import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    async login ({auth, request}:HttpContextContract) {
        const {email, password} = request.only(['email', 'password'])
        await auth.attempt(email, password)
        return auth.user
    }

    async register () {
      const user = await User.create({
        email: 'user',
        password: 'secret'
      })
      return user
    }

  async me ({auth}:HttpContextContract) {
    return auth.user
  }

}
