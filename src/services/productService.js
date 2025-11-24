import laptopImage from '../assets/laptop.png';
import iphoneImage from '../assets/iphone.png';
import headphonesImage from '../assets/headphones.png';

// Mock data
const PRODUCTS = [
    { id: 1, name: 'Laptop Pro', price: 1200, category: 'Laptops', description: 'Laptop de alto rendimiento para profesionales.', image: laptopImage },
    { id: 2, name: 'Iphone 14 pro max', price: 800, category: 'Teléfonos', description: 'El último smartphone con cámara avanzada.', image: iphoneImage },
    { id: 3, name: 'Headphones Max', price: 200, category: 'Audio', description: 'Auriculares con cancelación de ruido.', image: headphonesImage },
];

export const getProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS), 500);
    });
};

export const getProductById = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS.find(p => p.id === parseInt(id))), 500);
    });
};

export const uploadImage = async (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, this would upload to Firebase/Cloudinary
            // Here we just create a local URL
            const url = URL.createObjectURL(file);
            resolve(url);
        }, 1000);
    });
};

export const addProduct = async (product) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = { ...product, id: Date.now() };
            PRODUCTS.push(newProduct);
            resolve(newProduct);
        }, 500);
    });
};
