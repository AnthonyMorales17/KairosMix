import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';

const OrdersPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>
                        <ShoppingCart className="page-icon" />
                        Gestión de Pedidos
                    </h1>
                    <p className="page-description">
                        Administra órdenes, ventas y entregas
                    </p>
                </div>
            </div>
            <div className="coming-soon">
                <Package size={64} />
                <h2>Próximamente</h2>
        </div>
    </div>
);
};

export default OrdersPage;
