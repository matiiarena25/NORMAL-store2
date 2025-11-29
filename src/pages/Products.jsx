import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import useCart from '../context/CartContext/useCart';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error al obtener los productos:', error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="container mt-5">Cargando...</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 section-title">Nuestros Productos</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={product.image || product.imageUrl} className="card-img-top" alt={product.name} style={{ aspectRatio: '1/1', objectFit: 'contain', padding: '1rem' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/products/${product.id}`} className="btn btn-primary">Detalles</Link>
                                    <button className="btn btn-primary" onClick={() => addItem(product)}>Agregar al Carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
