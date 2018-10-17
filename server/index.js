import app from './app'
import log from './utils/logger'

import updateRecomendations from './utils/updateRecomendations'

const MINUTES = 30
setInterval(updateRecomendations, 1000 * 60 * MINUTES)
updateRecomendations()

const { PORT = 8080 } = process.env

app.listen(PORT, () => log.info(`Listening on port ${PORT}`))
