const express = require('express')
const cors = require('cors')
const {MongoClient, ServerApiVersion} = require('mongodb')
const mongo = require('mongodb')

const app = express()
const PORT = 8080
const mongoUri = 'mongodb+srv://admin:admin@cluster0.bzba9sv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})

let films

app.use(cors())
app.use(express.json())
app.listen(PORT, () => {})

client.connect(() => {
  films = client.db('arrays').collection('films')
})

app.put('/put/array/films', (req, res) => {
  films.insertOne(req.body)
  res.send('OK')
})

app.get('/get/films', (req, res) => {
  films.find({}).toArray((err, result) => {
    res.send(JSON.stringify(result))
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