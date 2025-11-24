import useCart from '../context/CartContext/useCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
    const { cart, total, addItem, decreaseItem, removeItem, clearCart } = useCart();
    const [showModal, setShowModal] = useState(false);

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <Link to="/products" className="btn btn-primary mt-3">Ir a Comprar</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Carrito de Compras</h2>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => decreaseItem(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => addItem(item)}>+</button>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-end fw-bold">Total:</td>
                        <td className="fw-bold">${total}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-outline-danger" onClick={clearCart}>Vaciar Carrito</button>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>Finalizar Compra</button>
            </div>

            <CheckoutModal
                show={showModal}
                onClose={() => {
                    clearCart();
                    setShowModal(false);
                }}
                onClearCart={clearCart}
            />
        </div>
    );
};

export default Cart;
