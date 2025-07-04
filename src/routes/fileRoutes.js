import { getUserFiles } from '../controllers/getUserFiles.js'
import { downloadFile } from '../controllers/downloadFile.js'
import { deleteFile } from '../controllers/deleteFile.js'
import { isAdmin, isSuperuser } from '../middleware/roleCheck.js'
import { canDeleteFile } from '../middleware/permissionCheck.js'

export default async function (app) {
  app.get('/files', { preValidation: [app.authenticate] }, getUserFiles)
  app.get('/files/:id/download', { preValidation: [app.authenticate]}, downloadFile)
  app.delete('/files/:id', { preValidation: [app.authenticate, canDeleteFile] }, deleteFile)
}
