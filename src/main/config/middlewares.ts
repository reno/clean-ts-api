import { Express } from 'express'
import { bodyParser } from '../middlewares.ts/body-parser'

export default (app: Express): void => {
  app.use(bodyParser)
}