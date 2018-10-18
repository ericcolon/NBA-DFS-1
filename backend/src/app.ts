import * as express from 'express'

import { applyMiddleware } from './middleware'
import { router } from './router'

export const app = express()

applyMiddleware(app)

app.use(router)
