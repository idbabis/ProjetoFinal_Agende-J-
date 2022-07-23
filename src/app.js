require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/mongooseConnect')
const lojasRoutes = require('./routes/lojasRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');

const app = express()

app.use(express.json())
app.use(cors())
app.use('/minha-rota-de-documentacao', swaggerUi.serve, swaggerUi.setup(swaggerFile));


mongoose.connect()

app.use(lojasRoutes)
app.use(usuarioRoutes)

module.exports = app

