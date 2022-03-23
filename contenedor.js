/*********************************************/
/********** Clase 06 -Servidores Web *********/ 
/************* Desafio Entregable ************/ 
/*********** Alumno: Emmanuel Pinto **********/ 
/*********************************************/

const fs = require("fs")

/*********************************************************************/ 
/******* Se define la clase llamada Contenedor que recibe ************/
/******* el nombre del archivo y contiene los metodos requeridos *****/ 
/*********************************************************************/ 

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

/****************************************************/ 
/*****Guarda productos nuevos dentro del FILE********/ 
/****************************************************/ 

    async save(title, price, thumbnail) {
        const product = {
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: null
        }
        try {
            const contenido = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            const products = JSON.parse(contenido);
            product.id = products.length + 1;
            products.push(product);
            fs.writeFileSync(`${this.fileName}`,  JSON.stringify(products));
            console.log(`Se ha guardado el producto ${product.title} con el ID: ${product.id}`)
        }
        catch(error) {
            console.log("No se pudo guardar el producto!", error)
            if (error == "SyntaxError: Unexpected end of JSON input"){
                const products = []
                product.id = 1;
                products.push(product);
                fs.writeFileSync(`${this.fileName}`, JSON.stringify(products));
                console.log(`El File estaba vacio. Finalmente se ha guardado el producto ${product.title} con el ID: ${product.id}`)
            }
        }
    }

/******************************************************/ 
/*****Busca por ID y devuelve info del producto********/ 
/******************************************************/ 

    getById = async (id) => {
        try{
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            const products = JSON.parse(data);
            const result = products.find((product) => product.id == id);
            if(result != undefined){
                return result;
            }else {
                console.log("El producto buscado no existe en el archivo!")
            }
        }
        catch(error) {
            console.log("No se pudo eliminar el producto buscado!", error)
        }
    }

/********************************************************/ 
/*****Busca por ID y elimina el producto del FILE********/ 
/********************************************************/ 

    deleteById = async (id) => {
        try{
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            const products = JSON.parse(data);
            const result = products.find((product) => product.id == id);
            if(result != undefined){
                const posicion = products.indexOf(result)
                products.splice(posicion, 1);
                console.log(posicion);
                console.log(result);
                console.log(products);
            
                fs.writeFileSync(`${this.fileName}`, JSON.stringify(products));
                console.log("Se removio el producto buscado.");
            }else {
                console.log("El producto buscado no existe en el archivo!")
            }
        }
        catch(error) {
            console.log("No se pudo obtener el producto buscado!", error)
        }
    }

/********************************************************/ 
/*****Elimina TODOS los productos dentro del FILE********/ 
/********************************************************/ 

    async deleteAll() {
        try {
            fs.writeFileSync(`${this.fileName}`,  "[]");
            console.log("Se han eliminado todos los productos!")
        }
        catch(error) {
            console.log("No se pudieron eliminar los productos!", error)
        }
    }

/*******************************************************/ 
/**************Elimina el archivo ENTERO****************/ 
/*******************************************************/ 

    deleteFile(){
        fs.unlink(`${this.fileName}`, error => {
            if(error){
                console.log("No se pudo borrar!", error)
            } else {
                console.log("Borrado!")
            }
        })
    }

/***********************************************************/ 
/******Devuelve TODOS los productos dentro del FILE*********/ 
/***********************************************************/ 

    async getAll() {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, 'utf-8');
            let prods = JSON.parse(data)
            return prods;
        }
        catch (error) {
            console.log("Error al leer el archivo!", error);
            return [];
        }
    }

}


/******Se crea en objeto contenedor********/
// let contenedor = new Contenedor("./productos.txt");


/******************************************************************************/ 
/******A partir de aqui, descomentar la el metodo que e desea ejecutar*********/ 
/******************************************************************************/ 

//Guarda el producto en el FILE y devuelve un mensaje con el ID asignado.
// contenedor.save("Lapiz", 150, "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/pencil-128.png")

//Recibe un ID, busca y devuelve el objeto con ese id, o null si no está.
// contenedor.getById(id)

// Devuelve el Array de Productos completo
// contenedor.getAll()

//Recibe un ID, busca y elimina del archivo el objeto con el id buscado.
// contenedor.deleteById(id)

// Vacia el FILE
// contenedor.deleteAll()


module.exports = Contenedor;