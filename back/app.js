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

client.connect((err) => {
  if (err !== undefined) {console.log(err)}

  films = client.db('arrays').collection('films')
})

app.put('/put/films', (req, res) => {
  films.insertOne(req.body)
  res.send('OK')
})

app.get('/get/films', (req, res) => {
  films.find({}).toArray((err, result) => {
    res.send(JSON.stringify(result))
  })
})

app.delete('/delete/:id', (req, res) => {
  let id = req.params.id

  films.deleteOne({_id: mongo.ObjectId(id)})
  res.send('OK')
})

app.patch('/update/:id', (req, res) => {
  let id = req.params.id

  films.updateOne({_id: mongo.ObjectId(id)}, {$set: req.body})


  res.send('OK')
})