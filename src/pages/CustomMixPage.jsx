import React from 'react';
import { Blend, Sparkles } from 'lucide-react';

const CustomMixPage = () => {
    return (
    <div className="page-container">
        <div className="page-header">
            <div className="header-content">
            <h1>
                <Blend className="page-icon" />
                Mezcla Personalizada
            </h1>
            <p className="page-description">
                Crea mezclas únicas de frutos secos para tus clientes
            </p>
        </div>
    </div>

    <div className="coming-soon">
        <Sparkles size={64} />
        <h2>Próximamente</h2>
    </div>
    </div>
);
};

export default CustomMixPage;
