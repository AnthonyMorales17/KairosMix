import React, { useState, useEffect } from 'react';
import { X, Download, FileSpreadsheet, Filter, Calendar, DollarSign, Package, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import './OrderReport.css';

const OrderReport = ({ orders, onClose }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    client: '',
    status: '',
    paymentMethod: ''
  });

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [reportData, setReportData] = useState({
    totalOrders: 0,
    grossSales: 0,
    netSales: 0,
    totalProducts: 0,
    totalCustomMixes: 0,
    averageOrderValue: 0,
    topProducts: [],
    salesByStatus: {},
    salesByPaymentMethod: {}
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const orderStatuses = ['Pendiente', 'En Proceso', 'En Espera', 'Completado', 'Cancelado'];
  const paymentMethods = ['Efectivo', 'Transferencia'];

  useEffect(() => {
    loadClients();
    applyFilters();
  }, [orders, filters]);

  useEffect(() => {
    calculateReportData();
  }, [filteredOrders]);

  const loadClients = () => {
    try {
      const savedClients = localStorage.getItem('clients');
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Filtro por rango de fechas
    if (filters.dateFrom) {
      filtered = filtered.filter(order => {
        const orderDate = parseDate(order.date || order.createdAt);
        const fromDate = new Date(filters.dateFrom);
        return orderDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      filtered = filtered.filter(order => {
        const orderDate = parseDate(order.date || order.createdAt);
        const toDate = new Date(filters.dateTo);
        return orderDate <= toDate;
      });
    }

    // Filtro por cliente
    if (filters.client) {
      filtered = filtered.filter(order => order.client && order.client.id === filters.client);
    }

    // Filtro por estado
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Filtro por método de pago
    if (filters.paymentMethod) {
      filtered = filtered.filter(order => 
        (order.paymentMethod || 'Efectivo') === filters.paymentMethod
      );
    }

    setFilteredOrders(filtered);
  };

  const parseDate = (dateString) => {
    // Manejo defensivo para fechas undefined, null o vacías
    if (!dateString) {
      return new Date(); // Fecha actual por defecto
    }
    
    // Si es un string ISO (formato createdAt)
    if (dateString.includes('T') || dateString.includes('-')) {
      return new Date(dateString);
    }
    
    // Si es formato DD/MM/YYYY (formato date)
    if (typeof dateString === 'string' && dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    
    // Fallback: intentar crear Date directamente
    const fallbackDate = new Date(dateString);
    return isNaN(fallbackDate.getTime()) ? new Date() : fallbackDate;
  };

  const calculateReportData = () => {
    const data = {
      totalOrders: filteredOrders.length,
      grossSales: 0,
      netSales: 0,
      totalProducts: 0,
      totalCustomMixes: 0,
      averageOrderValue: 0,
      topProducts: [],
      salesByStatus: {},
      salesByPaymentMethod: {}
    };

    const productSales = {};

    filteredOrders.forEach(order => {
      // Ventas brutas y netas
      data.grossSales += order.subtotal || 0;
      data.netSales += order.total || 0;

      // Conteo de productos
      order.products.forEach(product => {
        data.totalProducts += product.quantity;
        
        // Agrupar ventas por producto
        if (productSales[product.code]) {
          productSales[product.code].quantity += product.quantity;
          productSales[product.code].total += product.quantity * product.price;
        } else {
          productSales[product.code] = {
            name: product.name,
            quantity: product.quantity,
            total: product.quantity * product.price
          };
        }
      });

      // Ventas por estado
      if (data.salesByStatus[order.status]) {
        data.salesByStatus[order.status]++;
      } else {
        data.salesByStatus[order.status] = 1;
      }

      // Ventas por método de pago
      const paymentMethod = order.paymentMethod || 'Efectivo';
      if (data.salesByPaymentMethod[paymentMethod]) {
        data.salesByPaymentMethod[paymentMethod]++;
      } else {
        data.salesByPaymentMethod[paymentMethod] = 1;
      }
    });

    // Calcular promedio
    data.averageOrderValue = data.totalOrders > 0 ? data.netSales / data.totalOrders : 0;

    // Top productos más vendidos
    data.topProducts = Object.entries(productSales)
      .map(([code, data]) => ({ code, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    setReportData(data);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      client: '',
      status: '',
      paymentMethod: ''
    });
  };

  const generateExcelReport = async () => {
    if (filteredOrders.length === 0) {
      Swal.fire({
        title: 'Sin Datos',
        text: 'No hay pedidos que coincidan con los filtros para generar el reporte',
        icon: 'warning'
      });
      return;
    }

    setLoading(true);

    try {
      // Simular generación de reporte
      await new Promise(resolve => setTimeout(resolve, 2000));

      // En una implementación real, aquí usarías una librería como xlsx o similar
      const csvContent = generateCSVContent();
      downloadFile(csvContent, 'reporte-pedidos.csv', 'text/csv');

      Swal.fire({
        title: '¡Reporte Generado!',
        text: 'El reporte ha sido descargado exitosamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el reporte. Intenta nuevamente.',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateCSVContent = () => {
    let csv = 'REPORTE DE PEDIDOS - KAIROSMIX\n\n';
    
    // Resumen general
    csv += 'RESUMEN GENERAL\n';
    csv += `Total de Pedidos,${reportData.totalOrders}\n`;
    csv += `Ventas Brutas,${reportData.grossSales.toFixed(2)}\n`;
    csv += `Ventas Netas,${reportData.netSales.toFixed(2)}\n`;
    csv += `Total Productos Vendidos,${reportData.totalProducts}\n`;
    csv += `Valor Promedio por Pedido,${reportData.averageOrderValue.toFixed(2)}\n\n`;

    // Detalle de pedidos
    csv += 'DETALLE DE PEDIDOS\n';
    csv += 'ID,Fecha,Cliente,Estado,Método Pago,Subtotal,IVA,Total\n';
    
    filteredOrders.forEach(order => {
      csv += `${order.id},${order.date},"${order.client && order.client.name ? order.client.name : 'Cliente no especificado'}",${order.status},${order.paymentMethod || 'Efectivo'},${(order.subtotal || 0).toFixed(2)},${(order.taxes || 0).toFixed(2)},${order.total.toFixed(2)}\n`;
    });

    csv += '\nPRODUCTOS MÁS VENDIDOS\n';
    csv += 'Código,Producto,Cantidad,Total Ventas\n';
    
    reportData.topProducts.forEach(product => {
      csv += `${product.code},"${product.name}",${product.quantity},${product.total.toFixed(2)}\n`;
    });

    return csv;
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Fecha no disponible';
    }
    
    // Si es un string ISO (formato createdAt), convertir a DD/MM/YYYY
    if (dateString.includes('T') || dateString.includes('-')) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    // Si ya está en formato DD/MM/YYYY, devolverlo tal como está
    return dateString;
  };

  return (
    <div className="order-report">
      <div className="report-header">
        <h3>
          <FileSpreadsheet className="header-icon" />
          Reporte de Pedidos
        </h3>
        <div className="header-actions">
          <button
            className="btn btn-success"
            onClick={generateExcelReport}
            disabled={loading}
          >
            <Download size={16} />
            {loading ? 'Generando...' : 'Descargar Excel'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            <X size={16} />
            Cerrar
          </button>
        </div>
      </div>

      <div className="report-content">
        {/* Filtros */}
        <div className="filters-section">
          <h5>
            <Filter size={18} />
            Filtros del Reporte
          </h5>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Fecha Desde</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha Hasta</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Cliente</label>
              <select
                className="form-select"
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
              >
                <option value="">Todos</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">Todos</option>
                {orderStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Método Pago</label>
              <select
                className="form-select"
                value={filters.paymentMethod}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
              >
                <option value="">Todos</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={clearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Resumen de Estadísticas */}
        <div className="statistics-section">
          <h5>Resumen de Estadísticas</h5>
          <div className="row">
            <div className="col-md-3">
              <div className="stat-card">
                <div className="stat-icon">
                  <FileSpreadsheet className="text-primary" />
                </div>
                <div className="stat-info">
                  <h3>{reportData.totalOrders}</h3>
                  <p>Total Pedidos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <div className="stat-icon">
                  <DollarSign className="text-success" />
                </div>
                <div className="stat-info">
                  <h3>{formatCurrency(reportData.netSales)}</h3>
                  <p>Ventas Netas</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <div className="stat-icon">
                  <Package className="text-warning" />
                </div>
                <div className="stat-info">
                  <h3>{reportData.totalProducts}</h3>
                  <p>Productos Vendidos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <div className="stat-icon">
                  <Users className="text-info" />
                </div>
                <div className="stat-info">
                  <h3>{formatCurrency(reportData.averageOrderValue)}</h3>
                  <p>Promedio por Pedido</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detalle Financiero */}
        <div className="row">
          <div className="col-md-6">
            <div className="report-section">
              <h6>Detalle Financiero</h6>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td>Ventas Brutas (sin IVA):</td>
                    <td><strong>{formatCurrency(reportData.grossSales)}</strong></td>
                  </tr>
                  <tr>
                    <td>IVA Total (15%):</td>
                    <td><strong>{formatCurrency(reportData.netSales - reportData.grossSales)}</strong></td>
                  </tr>
                  <tr className="table-success">
                    <td><strong>Ventas Netas (con IVA):</strong></td>
                    <td><strong>{formatCurrency(reportData.netSales)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="report-section">
              <h6>Distribución por Estado</h6>
              <table className="table table-sm">
                <tbody>
                  {Object.entries(reportData.salesByStatus).map(([status, count]) => (
                    <tr key={status}>
                      <td>{status}:</td>
                      <td><strong>{count} pedidos</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Productos */}
        {reportData.topProducts.length > 0 && (
          <div className="report-section">
            <h6>Productos Más Vendidos</h6>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>Ranking</th>
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Cantidad Vendida</th>
                    <th>Total Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topProducts.map((product, index) => (
                    <tr key={product.code}>
                      <td>
                        <span className="ranking-badge">#{index + 1}</span>
                      </td>
                      <td><code>{product.code}</code></td>
                      <td>{product.name}</td>
                      <td><strong>{product.quantity}</strong></td>
                      <td><strong>{formatCurrency(product.total)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Lista de Pedidos Filtrados */}
        {filteredOrders.length > 0 && (
          <div className="report-section">
            <h6>Pedidos Incluidos en el Reporte ({filteredOrders.length})</h6>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Método Pago</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>#{order.id}</strong></td>
                      <td>{formatDate(order.date || order.createdAt)}</td>
                      <td>{order.client && order.client.name ? order.client.name : 'Cliente no especificado'}</td>
                      <td>
                        <span className={`badge bg-${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.paymentMethod || 'Efectivo'}</td>
                      <td><strong>{formatCurrency(order.total)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function getStatusColor(status) {
    const colors = {
      'Pendiente': 'warning',
      'En Proceso': 'primary',
      'En Espera': 'info',
      'Completado': 'success',
      'Cancelado': 'danger'
    };
    return colors[status] || 'secondary';
  }
};

export default OrderReport;
