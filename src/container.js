import fs from 'fs'


export default class Productos {
    constructor(nombre) {
        this.archivo = nombre
        this.data = []
        
        try {
            console.log('Initializing...')
            this.init()
        }
        catch(error) {
            this.write
        }
    }
    write() {
        fs.writeFileSync(this.nombre, JSON.stringify(this.data));
    }
    async init() {
        this.data = await this.getAll()
    }

    async save(item) {
        try {
            await this.init()
            item = {...item, id: this.data.length + 1}
            console.log(this.data)
            this.data.push(item)
            await fs.promises.appendFile(this.archivo, JSON.stringify(item) + '\n')
            return item.id
        }
        catch (error) {

            console.log(error)

        }
    }
    
    async getAll() {
        try {
            let objetosJSON = await fs.promises.readFile(this.archivo, 'utf-8')
            let objSwap = objetosJSON.split('\n').filter(obj => obj != '')
            let objetos = objSwap.map(obj => JSON.parse(obj))
            return objetos
        }
        catch (error) {
            console.log(error)
        }
    }
    
    async getById(id) {
        try {
            let productos = await this.getAll()
            let coincidencia = null
            productos.forEach(product => {
                if (product.id === id) {
                    coincidencia = product
                }
            })
            return coincidencia
        }
        catch (error) {
            console.log(error)
        }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, '')
        }
        catch (error) {
            console.log(error)
        }
    }
    
    async editById(id, campo, valor) {
        try {
            let productos = await this.getAll();
            let producto = productos.filter(producto => producto.id === id);
            producto[campo] = valor;
            const index = productos.findIndex(producto => producto.id === id);
            
            productos.splice(index, 1, producto);
            
            const productosParsed = JSON.stringify(productos);
            
            await fs.promises.writeFile(this.archivo, productosParsed)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    async deleteById(id) {
        try {
            let productos = await this.getAll()
            let productosCargar = productos.filter(obj => obj.id !== id)
            this.deleteAll()
            productosCargar.forEach(obj => fs.promises.appendFile(this.archivo, JSON.stringify(obj) + '\n'))
        }
        catch (error) {
            console.log(error)
        }
    }
}

/* export default class Productos {
    constructor(nombre) {
        this.nombre = nombre;
        this.product = [];
    }

    async saveProduct(item)  {
        try{
            await fs.promises.appendFile(this.nombre, JSON.stringify(this.product, null, '\t'))
        }catch(err){
            console.error("Can`t save file: " + err)
              fs.promises.writeFile(this.nombre, JSON.stringify(this.product, null, '\t'))
        }
       /*  if(this.product.length===0){
            item.id=1
            this.product.push(item)
        }else{
            item.id = this.product[this.product.length-1].id +1
            this.product.push({...item, ...{id: item.id + 1}
            })
        } */
 /*    }
     async getAllProducts(){
         try{
             let content = await fs.promises.readFile(this.product, 'utf-8')
             if(content) return console.log(content)
             return this.product
         }catch(err){
             console.error([])
         }
    }

    getId(){
        const l = this.product.length
        if(l < 1) return 0
        return this.product[this.product.length - 1].id
    }
} */ 