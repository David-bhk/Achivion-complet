import { getUserFiles } from '../controllers/getUserFiles.js'

export default async function (app) {
  app.get('/files', { preValidation: [app.authenticate] }, getUserFiles)
}
