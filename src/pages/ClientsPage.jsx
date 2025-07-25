import React from 'react';
import { Users, UserPlus, Search } from 'lucide-react';

const ClientsPage = () => {
    return (
    <div className="page-container">
        <div className="page-header">
            <div className="header-content">
                <h1>
                    <Users className="page-icon" />
                    Gestión de Clientes
                </h1>
                <p className="page-description">
                    Administra tu base de clientes y sus preferencias
                </p>
            </div>
        </div>
    
        <div className="coming-soon">
            <UserPlus size={64} />
            <h2>Próximamente</h2>
            <p>La gestión de clientes estará disponible en la próxima versión.</p>
            <p>Por ahora, nos enfocamos en la gestión de productos.</p>
        </div>
    </div>
);
};

export default ClientsPage;
