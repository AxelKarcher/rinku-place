const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./connect')
const usersRoutes = require('./routes/usersRoutes')
const filmsRoutes = require('./routes/filmsRoutes')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Server started on port', process.env.PORT))

app.use('/users', usersRoutes)
app.use('/films', filmsRoutes)

app.use(notFound)
app.use(errorHandler)