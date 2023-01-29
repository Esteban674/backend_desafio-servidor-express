const fs = require('fs');

class Product {
  static _id = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product._id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  };
}

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    //verifica que esten completos todos los campos
    if (!(title && description && price && thumbnail && code && stock)) {
      console.log('Es obligatorio completar todos los campos');
      return;
    };

    try {
      const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
      this.products = JSON.parse(lectura);
    } catch (error) {
      
    }

    this.products = [...this.products, new Product(title, description, price, thumbnail, code, stock)];

    await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
  }

  async getProducts() {

    try {
      const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
      this.products = JSON.parse(lectura);
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log([]);
    }
  }

  async getProductById(id) {

    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    const product = this.products.find(product => product.id === id) || 'Not found';
    console.log(product);
    return product;
  }

  async updateProduct(id, fields) {

    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    let product = this.products.find(product => product.id === id) || 'Not found';
    let productUpdated = { ...product, ...fields }
    this.products = [productUpdated, ...this.products.filter(product => product.id !== id)];
    console.log(this.products);
    await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));

  }

  async deleteProduct(id) {
    const lectura = await fs.promises.readFile(`${this.path}`, 'utf-8');
    this.products = JSON.parse(lectura);
    if (this.products.some(product => product.id === id)) {
      this.products = this.products.filter(product => product.id !== id);
      await fs.promises.writeFile(`${this.path}`, JSON.stringify(this.products));
    } else {
      console.log('El id ingresado no pertenece a un producto existente');
    }
  }
}


//-----TESTING-----
//Creamos una instancia de ProductManager
const ProductManager1 = new ProductManager('./src/productos.txt');

//COMENTAR DESPUES DE CADA USO DE LAS LLAMADAS

//Llamamos al metodo getProducts
ProductManager1.getProducts();



//Llamamos al metodo addProdcuts
// ProductManager1.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'sin imagen', 'abc123', 25);

// ProductManager1.addProduct('producto prueba2', 'Este es un producto de prueba2', 500, 'sin imagen', 'asd456', 12);

// ProductManager1.addProduct('producto prueba3', 'Este es un producto de prueba3', 600, 'sin imagen', 'asd789', 18);




// Llamamos nuevamente al metodo getProducts
// ProductManager1.getProducts();



//Llamamos al metodo getProductsById
// ProductManager1.getProductById(2);


//Llamamos al metodo updateProduct
// ProductManager1.updateProduct(1, {title:'producto modificado', price:123});

//Llamamos al metodo deleteProduct
// ProductManager1.deleteProduct(3);


