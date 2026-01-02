import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminproduct.css';

//sayfa gözükmüyor!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        barcode: '',
        description: '',
        rate: 0
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const version = '1'; // API versiyonu

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://localhost:5000/api/v${version}/Product`, {
                params: {
                    PageNumber: currentPage,
                    PageSize: pageSize
                }
            });
            setProducts(response.data.items);
            setTotalPages(Math.ceil(response.data.totalCount / pageSize));
            setLoading(false);
        } catch (error) {
            console.error('Error loading products:', error);
            setError('Failed to load products. Please try again later.');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rate' ? parseFloat(value) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`https://localhost:5000/api/v${version}/Product/${editingId}`, {
                    id: editingId,
                    ...formData
                });
            } else {
                await axios.post(`https://localhost:5000/api/v${version}/Product`, formData);
            }
            setFormData({
                name: '',
                barcode: '',
                description: '',
                rate: 0
            });
            setEditingId(null);
            fetchProducts();
        } catch (error) {
            console.error('Error during operation:', error);
            setError('Failed to save product. Please try again.');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            barcode: product.barcode,
            description: product.description,
            rate: product.rate
        });
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`https://localhost:5000/api/v${version}/Product/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error during deletion:', error);
                setError('Failed to delete product. Please try again.');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return (
            <div className="admin-product-container">
                <div className="loading">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-product-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="admin-product-container">
            <h2>Product Management</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Barcode</label>
                    <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        placeholder="Enter barcode"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rate</label>
                    <input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        placeholder="Enter rate"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    {editingId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            <div className="products-list">
                <h3>Products List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Barcode</th>
                            <th>Description</th>
                            <th>Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.barcode}</td>
                                <td>{product.description}</td>
                                <td>{product.rate}</td>
                                <td>
                                    <button onClick={() => handleEdit(product)} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProduct;
