export const sampleProducts = [
  {
    id: 1,
    code: 'A01',
    name: 'Almendras Premium',
    countryOfOrigin: 'Estados Unidos',
    pricePerPound: 15.99,
    wholesalePrice: 14.50,
    retailPrice: 17.99,
    initialStock: 50,
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
    image: null,
    imagePreview: ''
  }
];

// Función para inicializar datos de ejemplo
export const initializeSampleData = () => {
  localStorage.setItem('products', JSON.stringify(sampleProducts));
  console.log('Datos de productos inicializados correctamente');
};
