require('module-alias/register')
require('dotenv').config({ path: '.env.local' })
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = require('~/swagger-settings')
const example = require('~/routes/example')
const user = require('~/routes/user')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const swaggerSettings = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSettings))

app.use('/example', example)
app.use('/user', user)

mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@teachma.693y8.mongodb.net/test`)
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running at port ${process.env.SERVER_PORT}`)
    })
  })
  .catch(err => console.log(err))
