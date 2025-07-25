import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Users, ShoppingCart, Blend } from 'lucide-react';
import './Sidebar.css';

    const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
        path: '/productos',
        icon: Package,
        label: 'Productos',
        description: 'Gestionar frutos secos'
        },
        {
        path: '/clientes',
        icon: Users,
        label: 'Clientes',
        description: 'Administrar base de clientes'
        },
        {
        path: '/pedidos',
        icon: ShoppingCart,
        label: 'Pedidos',
        description: 'Gestionar órdenes y ventas'
        },
        {
        path: '/mezcla-personalizada',
        icon: Blend,
        label: 'Mezcla Personalizada',
        description: 'Crear mezclas únicas'
        }
    ];

    return (
        <aside className="sidebar">
        <div className="sidebar-header">
            <h1 className="sidebar-title">
            <span className="brand-icon">🌰</span>
            KairosMix
            </h1>
            <p className="sidebar-subtitle">Frutos Secos Premium</p>
        </div>

        <nav className="sidebar-nav">
            {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                >
                <div className="nav-icon">
                    <IconComponent size={24} />
                </div>
                <div className="nav-content">
                    <div className="nav-label">{item.label}</div>
                    <div className="nav-description">{item.description}</div>
                </div>
                </Link>
            );
            })}
        </nav>

        <div className="sidebar-footer">
            <div className="user-info">
            <div className="user-avatar">
                <span>E</span>
            </div>
            <div className="user-details">
                <div className="user-name">Esteban Vinicio</div>
                <div className="user-role">Administrador</div>
            </div>
            </div>
        </div>
        </aside>
    );
    };

export default Sidebar;
