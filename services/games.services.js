const faker = require("faker");
const boom = require("@hapi/boom");

class gameServices {
  constructor() {
    this.games = [];
    this.generate();
  }

  async generate() {
    const limit = 10; // cuanddo size sea 0 optamos por limite de 10
    for (var i = 0; i < limit; i++) {
      this.games.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async create(data) {
    try {
      const newGame = {
        id: faker.datatype.uuid(),
        ...data
      }
      this.games.push(newGame);
    } catch (err) {
      throw boom.notCreated('product not found');
    }
  }

  async find() {
    try {
      return this.games;
    } catch (err) {
      throw boom.notFound('Juego no encontrado');
    }
  }

  async findOne(id) {
    const product = this.games.find(item => item.id === id);
    if (!product) {
      console.log(product)
      throw boom.notFound('Juego no encontrado');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.games.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }

    const product = this.games[index];
    this.games[index] = {
      ...product,
      ...changes
    }
    return this.games[changes];
  }

  async delete(id) {

    const index = this.games.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.games.splice(index, 1);
    return { id };
  }
}

module.exports = gameServices;