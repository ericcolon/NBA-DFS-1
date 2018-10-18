import { app } from './app'

const { PORT = 8080 } = process.env

app.listen(PORT, () => console.info(`Listening on port ${PORT}`))
