# KairosMix - Sistema de Gestión de Frutos Secos

![KairosMix Logo](https://img.shields.io/badge/KairosMix-Frutos%20Secos%20Premium-8B4513?style=for-the-badge&logo=leaf)

KairosMix es una aplicación web moderna para la gestión integral de un negocio de frutos secos premium. Permite administrar productos, clientes, pedidos y crear mezclas personalizadas.

## 🌰 Características Principales

### ✅ Implementado (v1.0)
- **Gestión de Productos**: Sistema completo para administrar inventario de frutos secos
  - Agregar, editar y eliminar productos
  - Control de stock con alertas
  - Categorización por tipo de fruto seco
  - Gestión de proveedores y fechas de vencimiento
  - Búsqueda y filtrado avanzado

### 🚧 Próximamente
- **Gestión de Clientes**: Administración de base de clientes y preferencias
- **Gestión de Pedidos**: Control de órdenes, ventas y entregas
- **Mezcla Personalizada**: Herramientas para crear combinaciones únicas

## 🎨 Diseño

La aplicación utiliza una paleta de colores inspirada en frutos secos:
- **Marrones**: Representan las nueces, almendras y avellanas (#8B4513, #D2691E)
- **Verdes**: Simbolizan frescura y naturaleza (#228B22, #32CD32)
- **Cremas**: Aportan calidez y elegancia (#F5F5DC, #F4E4C1)

## 🛠️ Tecnologías

- **Frontend**: React 18 + JavaScript
- **Routing**: React Router v6
- **Bundler**: Vite
- **Íconos**: Lucide React
- **Estilos**: CSS3 con variables personalizadas

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [URL_REPO]
cd KairosMix

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Layout/
│   │   ├── Layout.jsx
│   │   ├── Layout.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   └── Products/
│       ├── ProductManager.jsx
│       ├── ProductManager.css
│       ├── ProductForm.jsx
│       └── ProductForm.css
├── pages/
│   ├── ProductsPage.jsx
│   ├── ClientsPage.jsx
│   ├── OrdersPage.jsx
│   └── CustomMixPage.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 📋 Funcionalidades de Productos

### Gestión de Inventario
- ✅ Agregar nuevos productos con información completa
- ✅ Editar productos existentes
- ✅ Eliminar productos con confirmación
- ✅ Control de stock con indicadores visuales
- ✅ Gestión de categorías (Almendras, Nueces, Frutas Deshidratadas, etc.)

### Búsqueda y Filtrado
- ✅ Búsqueda por nombre y categoría
- ✅ Filtrado por categoría
- ✅ Indicadores de estado de stock

### Información de Productos
- ✅ Nombre y descripción
- ✅ Precio y unidad de medida
- ✅ Stock actual con alertas
- ✅ Proveedor
- ✅ Fecha de vencimiento
- ✅ Categorización

## 🎯 Roadmap

### Versión 1.1 - Gestión de Clientes
- [ ] CRUD de clientes
- [ ] Historial de compras
- [ ] Preferencias de productos
- [ ] Sistema de puntos/descuentos

### Versión 1.2 - Gestión de Pedidos
- [ ] Crear y gestionar pedidos
- [ ] Estados de pedido
- [ ] Facturación
- [ ] Reportes de ventas

### Versión 1.3 - Mezclas Personalizadas
- [ ] Creador de mezclas
- [ ] Calculadora de costos
- [ ] Plantillas de mezclas populares
- [ ] Gestión de recetas

## 👥 Contribución

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

Anthony - Desarrollador Principal

Link del Proyecto: [https://github.com/anthony/kairosmix](https://github.com/anthony/kairosmix)

---

⚡ Desarrollado con React + Vite para máximo rendimiento
🌰 Diseñado específicamente para el negocio de frutos secos premium+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
