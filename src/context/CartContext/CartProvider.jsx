import { useState, useEffect } from 'react';
import CartContext from './CartContext';

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Calculate total whenever cart changes
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const showNotification = (message) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000); // Increased duration to 5 seconds
    };

    const addItem = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        showNotification(`Se agregó ${product.name} al carrito`);
    };

    const decreaseItem = (id) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.id !== id);
            }
            return prevCart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        total,
        addItem,
        decreaseItem,
        removeItem,
        clearCart,
        notifications
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
