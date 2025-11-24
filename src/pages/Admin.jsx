import { useState, useEffect } from 'react';
import { uploadImage, addProduct, getProducts } from '../services/productService';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = newProduct.image;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const productToAdd = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                image: imageUrl
            };

            const addedProduct = await addProduct(productToAdd);
            setProducts([...products, addedProduct]);
            setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
            setImageFile(null);
            setPreview(null);
            alert('Producto agregado exitosamente!');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error al agregar el producto');
        } finally {
            setUploading(false);
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre del Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input
                                type="number"
                                className="form-control"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción Corta</label>
                            <textarea
                                className="form-control"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen del Producto</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        {preview && (
                            <div className="mb-3 text-center">
                                <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxHeight: '150px' }} />
                            </div>
                        )}
                        <button type="submit" className="btn btn-success w-100" disabled={uploading}>
                            {uploading ? 'Subiendo...' : 'Agregar Producto'}
                        </button>
                    </form>
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
                                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
