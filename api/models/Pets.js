const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  photos: [String],
  specie: {
    type: String,
    required: true,
    enum: ["perro", "gato", "otro"],
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["macho", "hembra"],
    lowercase: true,
  },
  age: String,
  size: {
    type: String,
    required: false,
    enum: ["chico", "mediano", "grande"],
    lowercase: true,
  },
  location: String,
  personality: String,
  history: String,
  vaccinated: Boolean,
  foundation: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Foundation",
  },
  neutered: Boolean,
  adopted: { type: Boolean, default: false },
});

const Pets = mongoose.model("Pet", petSchema);

module.exports = Pets;
