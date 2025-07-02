import { uploadFile } from '../controllers/uploadFile.js'

export default async function (app) {
  app.post('/upload', { preValidation: [app.authenticate] }, uploadFile)
}
