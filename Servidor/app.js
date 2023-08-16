const express = require('express') // Common JS
const bodyParser = require('body-parser')
require ('./src/config')
const apiRouter = require('./src/routes/api')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use('/api', apiRouter)

const PORT = process.env.port || 8080
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});