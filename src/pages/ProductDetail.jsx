import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getProductById } from '../services/productService';
import useCart from '../context/CartContext/useCart';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        getProductById(id).then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="container mt-5">Cargando...</div>;
    if (!product) return <div className="container mt-5">Producto no encontrado</div>;

    return (
        <div className="container mt-5">
            <Link to="/products" className="back-button">
                <FaArrowLeft /> Volver a productos
            </Link>
            <div className="card">
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.imageUrl} className="img-fluid rounded" alt={product.name} style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }} />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="lead fw-bold">${product.price}</p>
                        <p>Categoría: <span className="badge bg-secondary">{product.category}</span></p>
                        <p>{product.description}</p>
                        <button className="btn btn-primary btn-lg mt-3" onClick={() => addItem(product)}>Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
