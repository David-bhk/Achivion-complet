import { listUsers } from '../controllers/listUsers.js'

export default async function (app) {
  // Only ADMIN and SUPERUSER can list users
  app.get('/users', { preValidation: [app.authenticate] }, listUsers)
}
