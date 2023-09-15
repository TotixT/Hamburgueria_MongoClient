const express = require('express');

const { MongoClient } = require('mongodb');
require('dotenv').config();
const router = express.Router();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("hamburgueseria");

// Conexion MongoDb
async function connectDb() {
    try {
        await client.connect();
        console.log('DB Online');
    } catch (error) {
        console.log(error);
    }
}

connectDb();

const ingredientes = db.collection("ingredientes");
const hamburguesas = db.collection("hamburguesas");
const chefs = db.collection("chefs");
const categorias = db.collection("categorias");

// 1er EndPoint - Encontrar todos los ingredientes con stock menor a 400.

router.get("/EndPoint_1", async (req, res) => {
    try {
        const result = await ingredientes.find({ stock: { $lt: 400 } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 2do EndPoint - Encontrar todas las hamburguesas de la categoría “Vegetariana”

router.get("/EndPoint_2", async (req, res) => {
    try {
        const result = await hamburguesas.find({ categoria: "Vegetariana" }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


// 3er EndPoint - Encontrar todos los chefs que se especializan en “Carnes”

router.get("/EndPoint_3", async (req, res) => {
    try {
        const result = await chefs.find({ especialidad: "Carnes" }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 4to EndPoint - Aumentar en 1.5 el precio de todos los ingredientes

router.get("/EndPoint_4", async (req, res) => {
    try {
        const result = await ingredientes.updateMany({}, { $mul: { precio: 1.5 } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 5to EndPoint - Encontrar todas las hamburguesas preparadas por “ChefB”

router.get("/EndPoint_5", async (req, res) => {
    try {
        const result = await hamburguesas.find({ chef: "ChefB" }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 6to EndPoint - Encontrar el nombre y la descripción de todas las categorías

router.get("/EndPoint_6", async (req, res) => {
    try {
        const result = await categorias.find({}, { nombre: 1, descripcion: 1, _id: 0 }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 7mo EndPoint - Eliminar todos los ingredientes que tengan un stock de 0

router.get("/EndPoint_7", async (req, res) => {
    try {
        const result = await ingredientes.deleteMany({ stock: { $eq: 0 } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 8vo EndPoint - Agregar un nuevo ingrediente a la hamburguesa “Clásica”

router.get("/EndPoint_8", async (req, res) => {
    try {
        const result = await hamburguesas.updateOne({ nombre: "Clásica" }, { $push: { ingredientes: "Tocino" } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 9no EndPoint - Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente

router.get("/EndPoint_9", async (req, res) => {
    try {
        const result = await hamburguesas.find({ ingredientes: { $eq: "Pan integral" } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 10mo EndPoint -  Cambiar la especialidad del “ChefC” a “Cocina Internacional”

router.get("/EndPoint_10", async (req, res) => {
    try {
        const result = await chefs.findOneAndUpdate({ nombre: "ChefC" }, { $set: { especialidad: "Cocina Internacional" } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 11mo EndPoint - Encontrar el ingrediente más caro

router.get("/EndPoint_11", async (req, res) => {
    try {
        const result = await ingredientes.aggregate([{
            $group: { _id: null, maxValor: { $max: "$precio" } }
        }]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 12mo EndPoint - Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente

router.get("/EndPoint_12", async (req, res) => {
    try {
        const result = await hamburguesas.find({ ingredientes: { $ne: "Queso cheddar" } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 13ro EndPoint - Incrementar el stock de “Pan” en 100 unidades

router.get("/EndPoint_13", async (req, res) => {
    try {
        const result = await ingredientes.findOneAndUpdate({ nombre: "Pan" },
            { $inc: { stock: 100 } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 14vo EndPoint - Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”

router.get("/EndPoint_14", async (req, res) => {
    try {
        const result = await ingredientes.find({ descripcion: { $regex: "clásico" } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 15mo EndPoint - Listar las hamburguesas cuyo precio es menor o igual a $9

router.get("/EndPoint_15", async (req, res) => {
    try {
        const result = await hamburguesas.find({ precio: { $lt: 9 } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 16mo EndPoint - Contar cuántos chefs hay en la base de datos

router.get("/EndPoint_16", async (req, res) => {
    try {
        const result = await chefs.countDocuments({});
        res.send({ total: result });
    } catch (error) {
        console.log(error);
    }
});

// 17mo EndPoint - Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción

router.get("/EndPoint_17", async (req, res) => {
    try {
        const result = await categorias.find({ descripcion: { $regex: "gourmet" } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 18vo EndPoint - Eliminar las hamburguesas que contienen menos de 5 ingredientes

router.get("/EndPoint_18", async (req, res) => {
    try {
        const Thamburguesas = await hamburguesas.find().toArray();
        const hamburguesasMenos5Ingredientes = Thamburguesas.filter((hamburguesas) => hamburguesas.ingredientes.length < 5);
        const result = await hamburguesas.deleteMany({ _id: { $in: hamburguesasMenos5Ingredientes.map((hamburguesas) => hamburguesas._id) } });
        res.send({ eliminadas: result.deletedCount, hamburguesasEliminadas: hamburguesasMenos5Ingredientes });
    } catch (error) {
        console.log(error);
    }
});

// 19no EndPoint - Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”

router.get("/EndPoint_19", async (req, res) => {
    try {
        const result = await chefs.insertOne({ nombre: "ChefD", especialidad: "Cocina Asiática" });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 20mo EndPoint - Listar las hamburguesas en orden ascendente según su precio

router.get("/EndPoint_20", async (req, res) => {
    try {
        const result = await hamburguesas.find().sort({ precio: 1 }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 21ro EndPoint - Encontrar todos los ingredientes cuyo precio sea entre $2 y $5

router.get("/EndPoint_21", async (req, res) => {
    try {
        const result = await ingredientes.find({ precio: { $gte: 2, $lte: 5 } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 22do EndPoint - Actualizar la descripción del “Pan” a “Pan fresco y crujiente”

router.get("/EndPoint_22", async (req, res) => {
    try {
        const result = await ingredientes.updateOne({ nombre: "Pan" }, { $set: { descripcion: "Pan fresco y crujiente" } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 23ro EndPoint - Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes

router.get("/EndPoint_23", async (req, res) => {
    try {
        const result = await hamburguesas.find({ ingredientes: { $in: ["Tomate", "Lechuga"] } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 24to EndPoint - Listar todos los chefs excepto “ChefA”

router.get("/EndPoint_24", async (req, res) => {
    try {
        const result = await chefs.find({ nombre: { $ne: "ChefA" } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 25to EndPoint - Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”

router.get("/EndPoint_25", async (req, res) => {
    try {
        const result = await hamburguesas.findOneAndUpdate({ categoria: "Gourmet" },
            { $inc: { precio: 2 } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 26to EndPoint - Listar todos los ingredientes en orden alfabético

router.get("/EndPoint_26", async (req, res) => {
    try {
        const result = await ingredientes.find().sort({ nombre: 1 }).toArray();;
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 27mo EndPoint - Encontrar la hamburguesa más cara

router.get("/EndPoint_27", async (req, res) => {
    try {
        const result = await hamburguesas.aggregate([{
            $group: { _id: null, maxValor: { $max: "$precio" } }
        }]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 28vo EndPoint - Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”

router.get("/EndPoint_28", async (req, res) => {
    try {
        const result = await hamburguesas.updateMany({ categoria: "Clásica" }, { $push: { ingredientes: "Pepinillos" } });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 29no EndPoint - Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”

router.get("/EndPoint_29", async (req, res) => {
    try {
        const result = await chefs.deleteMany({ especialidad: "Cocina Vegetariana" });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 30mo EndPoint - Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes

router.get("/EndPoint_30", async (req, res) => {
    try {
        const Thamburguesas = await hamburguesas.find().toArray();
        const hamburguesasExactos7Ingredientes = Thamburguesas.filter((hamburguesas) => hamburguesas.ingredientes.length == 7);
        const result = await hamburguesas.find({ _id: { $in: hamburguesasExactos7Ingredientes.map((hamburguesas) => hamburguesas._id) } }).toArray();
        res.send({ Encontradas: result.deletedCount, hamburguesasEncontradas: hamburguesasExactos7Ingredientes });
    } catch (error) {
        console.log(error);
    }
});

// 31ro EndPoint - Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”

router.get("/EndPoint_31", async (req, res) => {
    try {
        const result = await hamburguesas.find({ categoria: "Gourmet" })
            .sort({ precio: -1 })
            .limit(1)
            .toArray();
        res.send(result[0]);
    } catch (error) {
        console.log(error);
    }
});

// 32do EndPoint - Listar todos los ingredientes junto con el número de hamburguesas que los contienen

router.get("/EndPoint_32", async (req, res) => {
    try {
        // Para los que estan instanciados en la coleccion de ingredientes
        // const ingredienteList = await ingredientes.find().toArray();
        // const result = {};
        // for(const ingrediente of ingredienteList){
        //     const count = await hamburguesas.countDocuments({ingredientes: ingrediente.nombre});
        //     result[ingrediente.nombre] = count;
        // }
        // res.send(result);

        // Para todos los ingredientes que contiene cada hamburguesa
        const result = await hamburguesas.aggregate([
            { $unwind: "$ingredientes" },
            {
                $group: {
                    _id: "$ingredientes",
                    cantidad_hamburguesas: { $sum: 1 }
                }
            }]).toArray();
        res.send(result);

    } catch (error) {
        console.log(error);
    }
});

// 33ro EndPoint - Listar los chefs junto con el número de hamburguesas que han preparado

router.get("/EndPoint_33", async (req, res) => {
    try {
        // Las que estan instanciadas
        // const result = await chefs.aggregate([
        //     {
        //         // Realizar un left join con la colección de hamburguesas
        //         $lookup: {
        //             from: "hamburguesas", // Nombre de la colección de hamburguesas
        //             localField: "nombre", // Campo local que coincide con el campo de hamburguesas
        //             foreignField: "chef", // Campo de hamburguesas que coincide con el campo local
        //             as: "hamburguesas_preparadas" // Nombre del campo para almacenar las hamburguesas coincidentes
        //         }
        //     },
        //     {
        //         // Proyectar solo el nombre del chef y la cantidad de hamburguesas preparadas
        //         $project: {
        //             _id: 0, // Excluir el campo _id
        //             nombre: 1, // Incluir el campo nombre (chef)
        //             cantidad_de_hamburguesas: { $size: "$hamburguesas_preparadas" } // Contar las hamburguesas coincidentes
        //         }
        //     }
        // ]).toArray();

        // Las que existen en toda la coleccion
        const result = await hamburguesas.aggregate([
            {
                $group: {
                    _id: "$chef",
                    cantidad_hamburguesas: { $sum: 1 }
                }
            }]).toArray();

        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

// 34to EndPoint - Encuentra la categoría con la mayor cantidad de hamburguesas

router.get("/EndPoint_34", async (req, res) => {
    try {
        const result = await hamburguesas.aggregate([
        { $group: { _id: "$categoria", cantidad_de_hamburguesas: { $sum: 1 } } }
            , { $sort: { cantidad_de_hamburguesas: -1 } }, {$limit: 1}]).toArray();

        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.send("No se encontraron categorías.");
        }
    } catch (error) {
        console.log(error);
    }
});

// 35to EndPoint - Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado

router.get("/EndPoint_35", async (req, res) => {
    try {
        const chefsConCostoTotal = await chefs.aggregate([
            {
                // Realizar un left join con la colección de hamburguesas
                $lookup: {
                    from: "hamburguesas", // Nombre de la colección de hamburguesas
                    localField: "nombre", // Campo local que coincide con el campo de hamburguesas
                    foreignField: "chef", // Campo de hamburguesas que coincide con el campo local
                    as: "hamburguesas_preparadas" // Nombre del campo para almacenar las hamburguesas coincidentes
                }
            },
            {
                // Desenrollar (unwind) el arreglo de hamburguesas preparadas
                $unwind: "$hamburguesas_preparadas"
            },
            {
                // Realizar un left join con la colección de ingredientes
                $lookup: {
                    from: "ingredientes", // Nombre de la colección de ingredientes
                    localField: "hamburguesas_preparadas.ingredientes", // Campo local que coincide con el campo de ingredientes
                    foreignField: "nombre", // Campo de ingredientes que coincide con el campo local
                    as: "ingredientes_hamburguesas" // Nombre del campo para almacenar los ingredientes coincidentes
                }
            },
            {
                // Proyectar solo el nombre del chef y el costo total de ingredientes
                $project: {
                    _id: 0, // Excluir el campo _id
                    nombre: 1, // Incluir el campo nombre (chef)
                    costo_total_ingredientes: {
                        $sum: "$ingredientes_hamburguesas.precio" // Calcular el costo total de ingredientes
                    }
                }
            }
        ]).toArray();

        res.send(chefsConCostoTotal);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

// 36to EndPoint - Encontrar todos los ingredientes que no están en ninguna hamburguesa

router.get("/EndPoint_36", async (req, res) => {
    try {
        const ingredientesSinHamburguesas = await ingredientes.aggregate([
            {
                // Realizar un left join con la colección de hamburguesas
                $lookup: {
                    from: "hamburguesas", // Nombre de la colección de hamburguesas
                    localField: "nombre", // Campo local que coincide con el campo de hamburguesas
                    foreignField: "ingredientes", // Campo de hamburguesas que coincide con el campo local
                    as: "hamburguesas_contenidas" // Nombre del campo para almacenar las hamburguesas coincidentes
                }
            },
            {
                // Filtrar los ingredientes que no tienen hamburguesas
                $match: {
                    hamburguesas_contenidas: { $eq: [] } // Ingredientes que no tienen hamburguesas coincidentes
                }
            }
        ]).toArray();

        res.send(ingredientesSinHamburguesas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

// 37mo EndPoint - Listar todas las hamburguesas con su descripción de categoría

router.get("/EndPoint_37", async (req, res) => {
    try {
        const hamburguesasConDescripcionCategoria = await hamburguesas.aggregate([
            {
                $lookup: {
                    from: "categorias", // Nombre de la colección de categorías
                    localField: "categoria",
                    foreignField: "nombre", // Campo de categorías que coincide con el campo local
                    as: "categoria_descripcion" // Nombre del campo para almacenar la descripción de categoría
                }
            },
            {
                $unwind: "$categoria_descripcion" // Desenrollar el arreglo de descripción de categoría
            },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    categoria: {
                        $ifNull: ["$categoria_descripcion.descripcion", "Categoría no encontrada"] // Si no hay descripción, mostrar "Categoría no encontrada"
                    },
                    ingredientes: 1,
                    precio: 1,
                    chef: 1
                }
            }
        ]).toArray();

        res.send(hamburguesasConDescripcionCategoria);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

// 38vo EndPoint - Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total

router.get("/EndPoint_38", async (req, res) => {
    try {
        const result = await hamburguesas.aggregate([
            {
                $group: {
                    _id: "$chef", // Agrupar por chef
                    totalIngredientes: { $sum: { $size: "$ingredientes" } } // Calcular el total de ingredientes sumando el tamaño del arreglo de ingredientes
                }
            },
            {
                $sort: { totalIngredientes: -1 } // Ordenar en orden descendente por el total de ingredientes
            },
            {
                $limit: 1 // Tomar el chef con el mayor total de ingredientes
            }
        ]).toArray();

        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('No se encontraron hamburguesas');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

// 39no EndPoint - Encontrar el precio promedio de las hamburguesas en cada categoría

router.get("/EndPoint_39", async (req, res) => {
    try {
        const result = await hamburguesas.aggregate([
            {
                $group: {
                    _id: "$categoria", // Agrupar por categoría
                    precioPromedio: { $avg: "$precio" } // Calcular el precio promedio de las hamburguesas en cada categoría
                }
            }
        ]).toArray();

        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send('No se encontraron hamburguesas');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

// 40mo EndPoint - Listar los chefs y la hamburguesa más cara que han preparado

router.get("/EndPoint_40", async (req, res) => {
    try {
        const result = await hamburguesas.aggregate([
            {
                $group: {
                    _id: '$chef', // Agrupar por chef
                    hamburguesaCara: { $max: '$precio' } // Encontrar la hamburguesa más cara para cada chef
                }
            },
            {
                $lookup: {
                    from: 'chefs', // Nombre de la colección de chefs
                    localField: '_id',
                    foreignField: 'nombre', // Campo de chefs que coincide con el campo local
                    as: 'chefData' // Nombre del campo para almacenar la información del chef
                }
            },
            {
                $unwind: '$chefData' // Desenrollar el arreglo de información del chef
            },
            {
                $project: {
                    _id: 1,
                    chef: '$chefData.nombre', // Utilizar el nombre del chef en lugar del ID
                    hamburguesaCara: 1
                }
            }
        ]).toArray();

        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send('No se encontraron chefs o hamburguesas');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router