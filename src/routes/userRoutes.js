import { listUsers } from '../controllers/listUsers.js'
import { updateUserRole } from '../controllers/updateUserRole.js'

export default async function (app) {
  // Only ADMIN and SUPERUSER can list users
  app.get('/users', { preValidation: [app.authenticate] }, listUsers)
  app.patch('/users/:id/role', { preValidation: [app.authenticate] }, updateUserRole)
}
