const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./connect')
const usersRoutes = require('./routes/usersRoutes')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Server started on port', process.env.PORT))

app.use('/users', usersRoutes)

// app.put('/put/array/films', (req, res) => {
//   films.insertOne(req.body)
//   res.send('OK')
// })

// app.get('/get/films', (req, res) => {
//   films.find({}).toArray((err, response) => {
//     res.send(JSON.stringify(response))
//   })
// })

// app.delete('/delete/array/:id', (req, res) => {
//   films.deleteOne({_id: mongo.ObjectId(req.params.id)})
//   res.send('OK')
// })

// app.patch('/update/array/films/:id', (req, res) => {
//   let id = req.params.id

//   films.updateOne({_id: mongo.ObjectId(id)}, {$set: req.body})
//   res.send('OK')
// })