import express from 'express'
import { config as configEnv } from 'dotenv'

import applyMiddleware from './middleware'
import router from './router'

configEnv()

const app = express()

applyMiddleware(app)

app.use(router)

export default app
