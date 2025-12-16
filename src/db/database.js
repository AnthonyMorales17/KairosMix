import Dexie from 'dexie';

// Crear la base de datos
export const db = new Dexie('KairosMixDB');

// Definir el esquema de la base de datos
db.version(1).stores({
    products: '++id, code, name, countryOfOrigin, pricePerPound, wholesalePrice, retailPrice, initialStock, stock, image, imagePreview'
});

// Datos de ejemplo para inicializar
const sampleProducts = [
    {
        id: 1,
        code: 'A01',
        name: 'Almendras Premium',
        countryOfOrigin: 'Estados Unidos',
        pricePerPound: 15.99,
        wholesalePrice: 14.50,
        retailPrice: 17.99,
        initialStock: 50,
        stock: 50,
        image: null,
        imagePreview: ''
    },
    {
        id: 2,
        code: 'N01',
        name: 'Nueces de Castilla',
        countryOfOrigin: 'Chile',
        pricePerPound: 22.50,
        wholesalePrice: 20.00,
        retailPrice: 25.99,
        initialStock: 30,
        stock: 30,
        image: null,
        imagePreview: ''
    },
    {
        id: 3,
        code: 'P01',
        name: 'Pasas Sultan',
        countryOfOrigin: 'Turquía',
        pricePerPound: 8.75,
        wholesalePrice: 7.50,
        retailPrice: 10.99,
        initialStock: 75,
        stock: 75,
        image: null,
        imagePreview: ''
    },
    {
        id: 4,
        code: 'P02',
        name: 'Pistachos Tostados',
        countryOfOrigin: 'Irán',
        pricePerPound: 35.00,
        wholesalePrice: 32.00,
        retailPrice: 39.99,
        initialStock: 20,
        stock: 20,
        image: null,
        imagePreview: ''
    },
    {
        id: 5,
        code: 'A02',
        name: 'Avellanas Enteras',
        countryOfOrigin: 'Italia',
        pricePerPound: 18.25,
        wholesalePrice: 16.50,
        retailPrice: 21.99,
        initialStock: 40,
        stock: 40,
        image: null,
        imagePreview: ''
    }
];

// Función para inicializar la base de datos con datos de ejemplo
export const initializeDatabase = async () => {
    try {
        const count = await db.products.count();

        // Solo insertar datos de ejemplo si la base de datos está vacía
        if (count === 0) {
            await db.products.bulkAdd(sampleProducts);
            console.log('Base de datos inicializada con productos de ejemplo');
        } else {
            console.log(`Base de datos ya contiene ${count} productos`);
        }
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

export default db;
