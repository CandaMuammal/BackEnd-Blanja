const express = require('express')
require('dotenv').config()
const app = express()
// const bodyParser = require('body-parser')
const productRouter = require('./src/router/product')
const userRouter = require('./src/router/user')
const historyRouter = require('./src/router/history')
const categoryRouter = require('./src/router/category')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const setCors = require('./src/middlewares/cors')
const createError = require('http-errors')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/history', historyRouter)
app.use('/category', categoryRouter)

app.use('*', (req, res, next) => {
  const error = new createError.NotFound()
  next(error)
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error'
  })
})

app.listen(7000, () => {
  console.log('server is running on port 7000')
})
