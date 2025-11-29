export const ProductFormUI = ({ product, errors, loading, onChange, onFileChange, onSubmit }) => {
    return (
        <section>
            <h2>Formulario de Producto</h2>
            <form className="product-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" value={product.name} onChange={onChange} placeholder="Nombre del producto" required />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="price">Precio</label>
                    <input type="number" name="price" value={product.price} onChange={onChange} placeholder="Precio" required />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" name="category" value={product.category} onChange={onChange} placeholder="Categoría" required />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>
                <div>
                    <label htmlFor="description">Descripcion</label>
                    <textarea name="description" value={product.description} onChange={onChange} placeholder="Descripción del producto" required />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="file" accept="image/*" name="image" onChange={(e) => onFileChange(e.target.files[0] ?? null)} required />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Subiendo...' : 'Subir'}</button>
            </form>
        </section>
    );
}