import { registerUser } from '../controllers/registerUser.js'
import { loginUser } from '../controllers/loginUser.js'

export default async function (app) {
  app.post('/register', registerUser)
  app.post('/login', loginUser)
}
