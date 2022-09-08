const PetServices = require("../services/pet.services");

class PetController {
  static async getAllPets(req, res) {
    try {
      const pets = await PetServices.getAllPets();
      if (!pets) return res.status(404).send("no data found");
      res.status(200).send(pets);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async createPet(req, res) {
    try {
      const pet = await PetServices.createPet(req.body);
      return res.status(201).send(pet);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async findPet(req, res) {
    try {
      const pet = await PetServices.getOnePet(req.params.id);
      return pet
        ? res.status(200).send(pet)
        : res.status(404).send("Pet not found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getSomePets(req, res) {
    try {
      const pets = await PetServices.getSomePets();
      return pets
        ? res.status(200).send(pets)
        : res.status(404).send("no data found");
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = PetController;
