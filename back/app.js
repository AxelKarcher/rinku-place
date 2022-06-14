const express = require('express')
const cors = require('cors')
const {MongoClient, ServerApiVersion} = require('mongodb')

const app = express()
const PORT = 8080
const mongoUri = 'mongodb+srv://admin:admin@cluster0.bzba9sv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1})

let collection

app.use(cors())
app.use(express.json())
app.listen(PORT, () => {})

client.connect((err) => {
  if (err !== undefined) {console.log(err)}

  collection = client.db('db').collection('arrays')
})

app.put('/put', (req, res) => {
  collection.insertOne(req.body)
  res.send('OK')
})

app.get('/get', (req, res) => {
  if (collection === undefined) {
    res.send('UNDEFINED')
    return
  }

  collection.find({}).toArray((err, result) => {
    res.send(JSON.stringify(result))
  })
})

app.delete('/delete/:label', (req, res) => {
  let label = req.params.label

  collection.deleteOne({label: label})
  res.send('OK')
})