import React, { useState, useEffect } from 'react';
import { X, Save, Package } from 'lucide-react';
import './ProductForm.css';

const ProductForm = ({ product, onSave, onCancel, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        unit: 'lb',
        description: '',
        supplier: '',
        expiryDate: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
        setFormData(product);
        }
    }, [product]);

    const units = ['lb'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    
    // Clear error when user starts typing
            if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
            }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
        newErrors.name = 'El nombre del producto es requerido';
        }

        if (!formData.category) {
        newErrors.category = 'La categoría es requerida';
        }

        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = 'El precio debe ser un número mayor a 0';
        }

        if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) {
        newErrors.stock = 'El stock debe ser un número mayor o igual a 0';
        }

        if (!formData.supplier.trim()) {
        newErrors.supplier = 'El proveedor es requerido';
        }

        if (!formData.expiryDate) {
        newErrors.expiryDate = 'La fecha de vencimiento es requerida';
        } else {
        const expiryDate = new Date(formData.expiryDate);
        const today = new Date();
        if (expiryDate <= today) {
            newErrors.expiryDate = 'La fecha de vencimiento debe ser posterior a hoy';
        }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
        const processedData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };
        onSave(processedData);
        }
    };

    return (
        <div className="form-overlay">
        <div className="form-modal">
            <div className="form-header">
            <h2>
                <Package size={24} />
                {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button 
                className="btn btn-outline-secondary rounded-circle"
                onClick={onCancel}
                type="button"
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <X size={20} />
            </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
            <div className="form-grid">
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del Producto *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Ej: Almendras Premium"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoría *</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>

                <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio *</label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    />
                </div>
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>

                <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock *</label>
                <div className="input-group">
                    <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                    placeholder="0"
                    min="0"
                    />
                    <span className="input-group-text">lb</span>
                </div>
                {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                </div>

                <div className="mb-3">
                <label htmlFor="supplier" className="form-label">Proveedor *</label>
                <input
                    type="text"
                    id="supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className={`form-control ${errors.supplier ? 'is-invalid' : ''}`}
                    placeholder="Ej: Distribuidora Premium"
                />
                {errors.supplier && <div className="invalid-feedback">{errors.supplier}</div>}
                </div>

                <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">Fecha de Vencimiento *</label>
                <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                />
                {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Descripción detallada del producto..."
                rows="3"
                />
            </div>

            <div className="form-actions">
                <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
                >
                Cancelar
                </button>
                <button 
                type="submit" 
                className="btn btn-success d-flex align-items-center"
                >
                <Save size={18} className="me-2" />
                {product ? 'Actualizar' : 'Guardar'} Producto
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

export default ProductForm;
