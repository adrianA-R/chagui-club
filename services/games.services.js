const faker = require("faker");
const boom = require("@hapi/boom");

class gameServices {
  constructor() {
    this.games = [];
    this.generate();
  }

  async generate() {
    // const limit = 5; // cuanddo size sea 0 optamos por limite de 10
    // for (var i = 0; i < limit; i++) {
    //   this.games.push({
    //     id: faker.datatype.uuid(),
    //     name: faker.commerce.productName(),
    //     price: parseInt(faker.commerce.price(), 10),
    //     image: faker.image.imageUrl()
    //   })
    // }

    this.games.push({ 
      id: faker.datatype.uuid(), 
      name: "Juego Didáctico 1",
      description: "Reprehenderit occaecat nisi ut mollit deserunt id ad anim velit veniam eiusmod irure ipsum. Elit pariatur tempor incididunt nisi enim minim eiusmod ad ea et culpa voluptate. Sunt adipisicing veniam nostrud dolor nulla. Duis officia enim cupidatat irure nulla id et enim elit proident labore. Reprehenderit elit dolore cupidatat id sit pariatur nostrud ex laborum elit. Eu commodo dolor culpa eiusmod commodo aliqua qui laborum ea occaecat elit sint.",
      type: "Presencial", 
      amount:"100", 
      places: "Parques",
      public: ["Niños"], 
      image:"/img/juegos_interactivos.jpg"
    });

    this.games.push({ 
      id: faker.datatype.uuid(), 
      name: "Juego Didáctico 2",
      description: "Reprehenderit occaecat nisi ut mollit deserunt id ad anim velit veniam eiusmod irure ipsum. Elit pariatur tempor incididunt nisi enim minim eiusmod ad ea et culpa voluptate. Sunt adipisicing veniam nostrud dolor nulla. Duis officia enim cupidatat irure nulla id et enim elit proident labore. Reprehenderit elit dolore cupidatat id sit pariatur nostrud ex laborum elit. Eu commodo dolor culpa eiusmod commodo aliqua qui laborum ea occaecat elit sint.",
      type: "Presencial", 
      amount:"Alta cantidad", 
      places: "Parques y ferias", 
      public: ["Niños","Niñas","Adolescentes","Adultos","Adultos Mayores"],
      image:"/img/juegos_interactivos2.jpg"
    });

    this.games.push({ 
      id: faker.datatype.uuid(), 
      name: "Juego Didáctico 3",
      description: "Reprehenderit occaecat nisi ut mollit deserunt id ad anim velit veniam eiusmod irure ipsum. Elit pariatur tempor incididunt nisi enim minim eiusmod ad ea et culpa voluptate. Sunt adipisicing veniam nostrud dolor nulla. Duis officia enim cupidatat irure nulla id et enim elit proident labore. Reprehenderit elit dolore cupidatat id sit pariatur nostrud ex laborum elit. Eu commodo dolor culpa eiusmod commodo aliqua qui laborum ea occaecat elit sint.",
      type: "Presencial", 
      amount:"cantidad media", 
      places: "Colegios e instituciones", 
      public: ["Niños","Niñas","Adolescentes"],
      image:"/img/juegos_interactivos3.jpg"
    });
    
    this.games.push({ 
      id: faker.datatype.uuid(), 
      name: "Juego o dinámica empresarial",
      description: "Reprehenderit occaecat nisi ut mollit deserunt id ad anim velit veniam eiusmod irure ipsum. Elit pariatur tempor incididunt nisi enim minim eiusmod ad ea et culpa voluptate. Sunt adipisicing veniam nostrud dolor nulla. Duis officia enim cupidatat irure nulla id et enim elit proident labore. Reprehenderit elit dolore cupidatat id sit pariatur nostrud ex laborum elit. Eu commodo dolor culpa eiusmod commodo aliqua qui laborum ea occaecat elit sint.",
      type: "Presencial", 
      amount:"Poca cantidad", 
      places: "Espacios cerrados", 
      public: ["Adultos", "Equipos de trabajo","Empresas"],
      image:"/img/juegos_interactivos4.jpg"
    });
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

    const index = this.games.findIndex(item => item.id == id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.games.splice(index, 1);
    return { id };
  }
}

module.exports = gameServices;