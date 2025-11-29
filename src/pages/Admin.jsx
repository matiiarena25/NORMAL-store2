import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { ProductFormContainer } from '../components/adminComponents/ProductFormContainer';

const Admin = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Panel de Administración</h2>

            <div className="card mb-5">
                <div className="card-header">
                    <h4>Agregar Nuevo Producto</h4>
                </div>
                <div className="card-body">
                    <ProductFormContainer onProductAdded={handleProductAdded} />
                </div>
            </div>

            <h3>Lista de Productos</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img src={product.image || product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
