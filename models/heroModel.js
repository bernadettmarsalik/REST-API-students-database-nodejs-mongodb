const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
  superheroName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

// exporting it we name it Hero and apply heroSchema
module.exports = mongoose.model("Hero", heroSchema);
