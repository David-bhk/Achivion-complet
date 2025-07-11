import { getUserFiles } from '../controllers/getUserFiles.js'
import { downloadFile } from '../controllers/downloadFile.js'
import { deleteFile } from '../controllers/deleteFile.js'
import { listFiles } from '../controllers/listFiles.js'
import { canDeleteFile } from '../middleware/permissionCheck.js'
import { isAdminOrSuperuser } from '../middleware/roleCheck.js' // Make sure this exists

export default async function (app) {
  // Route for normal users to get their own files
  app.get('/files', { preValidation: [app.authenticate] }, getUserFiles)

  // Route for admin/superusers to list ALL files
  app.get('/admin/files', { preValidation: [app.authenticate, isAdminOrSuperuser] }, listFiles)

  // Download and delete routes
  app.get('/files/:id/download', { preValidation: [app.authenticate] }, downloadFile)
  app.delete('/files/:id', { preValidation: [app.authenticate, canDeleteFile] }, deleteFile)
}
