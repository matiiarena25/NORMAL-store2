export const validateProduct = (product, fileRequired = true) => {
    const errors = {};
    if (!product.name.trim()) {
        errors.name = 'El nombre es requerido';
    }
    if (!product.price || product.price <= 0) {
        errors.price = 'El precio es requerido y debe ser mayor a 0';
    }
    if (!product.category.trim()) {
        errors.category = 'La categoria es requerida';
    }
    if (!product.description.trim()) {
        errors.description = 'La descripcion es requerida';
    }
    if (fileRequired && !product.file) {
        errors.image = 'La imagen es requerida';
    }
    return errors;
};
