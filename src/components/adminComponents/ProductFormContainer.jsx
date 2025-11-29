import { useState } from "react";
import { validateProduct } from "../../utils/validateProduct";
import { createProduct } from "../../services/productService";
import { ProductFormUI } from "./ProductFormUI.jsx";
import { uploadToImgbb } from "../../services/uploadImage";
import "./ProductFormContainer.css";

export const ProductFormContainer = ({ onProductAdded }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const newErrors = validateProduct({ ...product, file });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const imageUrl = await uploadToImgbb(file);
            const productData = { ...product, price: Number(product.price), imageUrl };
            const newProduct = await createProduct(productData);
            alert("Producto creado exitosamente");
            if (onProductAdded) {
                onProductAdded(newProduct);
            }
            setProduct({
                name: "",
                price: "",
                category: "",
                description: "",
                image: null
            });
            setFile(null);
            console.log(productData);
        } catch (error) {
            setErrors({ general: error.message });
        } finally {
            setLoading(false);
        }
    };
    return (
        <section>
            <ProductFormUI product={product} errors={errors} loading={loading} onChange={handleChange} onFileChange={setFile} onSubmit={handleSubmit} />
        </section>
    );
}
