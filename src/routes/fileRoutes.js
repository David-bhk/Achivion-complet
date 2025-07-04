import { getUserFiles } from '../controllers/getUserFiles.js'
import { downloadFile } from '../controllers/downloadFile.js'
import { deleteFile } from '../controllers/deleteFile.js'

export default async function (app) {
  app.get('/files', { preValidation: [app.authenticate] }, getUserFiles)
  app.get('/files/:id/download', { preValidation: [app.authenticate]}, downloadFile)
  app.delete('/files/:id', { preValidation: [app.authenticate] }, deleteFile)
}
