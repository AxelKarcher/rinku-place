const mongoose = require('mongoose')

const filmModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    out: {
      type: String,
      required: true
    },
    seen: {
      type: String,
      required: true
    },
    universe: {
      type: String
    },
    note: {
      type: mongoose.Decimal128,
      required: true
    }
  }
)

module.exports = filmModel