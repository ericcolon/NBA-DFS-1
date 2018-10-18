import * as bodyParser from 'body-parser'
const cookieParser = require('cookie-parser')
import {Express} from 'express'
import {passport} from './localPassport'
import morgan from './morgan'
import session from './session'
import * as cors from 'cors'

export const applyMiddleware = (app: Express): Express => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(morgan)
  app.use(cookieParser())
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  return app
}

