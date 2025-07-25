import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import ProductForm from './ProductForm';
import './ProductManager.css';

const ProductManager = () => {
const [products, setProducts] = useState([]);
const [showForm, setShowForm] = useState(false);
const [editingProduct, setEditingProduct] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [filterCategory, setFilterCategory] = useState('all');

  // Datos de ejemplo para productos de frutos secos
useEffect(() => {
    const sampleProducts = [
    {
        id: 1,
        name: 'Almendras Premium',
        category: 'Almendras',
        price: 15.99,
        stock: 50,
        unit: 'lb',
        description: 'Almendras de California, extra grandes y frescas',
        image: null,
        supplier: 'Distribuidora California',
        expiryDate: '2024-12-31'
    },
    {
        id: 2,
        name: 'Nueces de Castilla',
        category: 'Nueces',
        price: 22.50,
        stock: 30,
        unit: 'lb',
        description: 'Nueces frescas de temporada, ideales para repostería',
        image: null,
        supplier: 'Frutos del Valle',
        expiryDate: '2024-11-15'
    },
    {
        id: 3,
        name: 'Pasas Sultan',
        category: 'Frutas Deshidratadas',
        price: 8.75,
        stock: 75,
        unit: 'lb',
        description: 'Pasas sin semilla, naturalmente dulces',
        image: null,
        supplier: 'Frutas Secas S.A.',
        expiryDate: '2025-06-30'
    },
    {
        id: 4,
        name: 'Pistachos Tostados',
        category: 'Pistachos',
        price: 35.00,
        stock: 20,
        unit: 'lb',
        description: 'Pistachos premium tostados con sal marina',
        image: null,
        supplier: 'Importadora Premium',
        expiryDate: '2024-10-20'
    },
    {
        id: 5,
        name: 'Avellanas Enteras',
        category: 'Avellanas',
        price: 18.25,
        stock: 40,
        unit: 'lb',
        description: 'Avellanas enteras, perfectas para snacks',
        image: null,
        supplier: 'Frutos del Norte',
        expiryDate: '2025-01-15'
    }
    ];
    setProducts(sampleProducts);
    }, []);

    const categories = ['all', 'Almendras', 'Nueces', 'Frutas Deshidratadas', 'Pistachos', 'Avellanas'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddProduct = (productData) => {
        const newProduct = {
        ...productData,
        id: Date.now()
        };
        setProducts([...products, newProduct]);
        setShowForm(false);
    };    

    const handleEditProduct = (productData) => {
        setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
        ));
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        setProducts(products.filter(p => p.id !== id));
        }
    };

    const openEditForm = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return 'out-of-stock';
        if (stock <= 10) return 'low-stock';
        return 'in-stock';
    };

  return (
    <div className="product-manager">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Package className="page-icon" />
            Gestión de Productos
          </h1>
          <p className="page-description">
            Administra tu inventario de frutos secos y productos premium
          </p>
        </div>
        <button 
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} className="me-2" />
          Nuevo Producto
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-filter" className="form-label">Categoría:</label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas las categorías' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="image-placeholder">
                  <Package size={40} />
                </div>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <div className="detail-item">
                  <span className="detail-label">Precio:</span>
                  <span className="product-price">${product.price}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Stock:</span>
                  <span className={`stock-badge ${getStockStatus(product.stock)}`}>
                    {product.stock} {product.unit}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Proveedor:</span>
                  <span className="product-supplier">{product.supplier}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Vencimiento:</span>
                  <span className="expiry-date">{product.expiryDate}</span>
                </div>
              </div>
            </div>
            
            <div className="product-actions">
              <button
                className="btn btn-warning btn-sm rounded-circle me-2"
                onClick={() => openEditForm(product)}
                title="Editar producto"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Edit size={16} />
              </button>
              <button
                className="btn btn-danger btn-sm rounded-circle"
                onClick={() => handleDeleteProduct(product.id)}
                title="Eliminar producto"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <Package size={64} />
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros o agrega un nuevo producto</p>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={closeForm}
          categories={categories.filter(cat => cat !== 'all')}
        />
      )}
    </div>
  );
};

export default ProductManager;
