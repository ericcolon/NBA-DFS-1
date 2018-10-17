import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import localPassport from './localPassport'
import morgan from './morgan'
import session from './session'
import cors from 'cors'

const applyMiddleware = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(morgan)
  app.use(cookieParser())
  app.use(session)
  app.use(localPassport.initialize())
  app.use(localPassport.session())

  return app
}

export default applyMiddleware
