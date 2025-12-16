import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import './App.css';

function App() {
  // Detectar si estamos en GitHub Pages o desarrollo local
  const basename = import.meta.env.DEV ? '/' : '/KairosMix/';

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/productos" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
