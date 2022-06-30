const express = require('express')
const cors = require('cors')
const {MongoClient, ServerApiVersion} = require('mongodb')
const mongo = require('mongodb')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const mongoUri = process.env.MONGO_URL
const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})

let films, users

app.use(cors())
app.use(express.json())
app.listen(PORT, () => {})

client.connect(() => {
  films = client.db('arrays').collection('films')
  users = client.db('db').collection('users')
})

app.post('/auth/:authStatus', (req, res) => {
  let tmp

  if (req.params.authStatus === 'login') {
    users.find({pseudo: req.body.pseudo}).toArray((err, response) => {
      tmp = response[0]
      if (tmp.password === req.body.password) {
        res.send('OK')
      } else {
        res.send('KO')
      }
    })
  } else {
    res.send('registering')
  }
})

app.put('/put/array/films', (req, res) => {
  films.insertOne(req.body)
  res.send('OK')
})

app.get('/get/films', (req, res) => {
  films.find({}).toArray((err, response) => {
    res.send(JSON.stringify(response))
  })
})

app.delete('/delete/array/:id', (req, res) => {
  films.deleteOne({_id: mongo.ObjectId(req.params.id)})
  res.send('OK')
})

app.patch('/update/array/films/:id', (req, res) => {
  let id = req.params.id

  films.updateOne({_id: mongo.ObjectId(id)}, {$set: req.body})
  res.send('OK')
})