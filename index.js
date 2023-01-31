require('dotenv').config()

const cors = require('cors')
const express = require('express')

/* -- Middlewares -- */ 
const logger = require('./middleware/logger')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

/* -- Controllers -- */ 
const twitterRouter = require('./controller/twitter')
const cohereRouter = require('./controller/cohere')

const app = express()
app.use(cors())

app.use(express.json())
app.use(logger)

app.use('/api/twitter', twitterRouter)
app.use('/api/cohere', cohereRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})