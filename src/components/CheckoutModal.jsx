import { useNavigate } from 'react-router-dom';
import graciasImage from '../assets/gracias.png';

const CheckoutModal = ({ show, onClose, onClearCart }) => {
    const navigate = useNavigate();

    if (!show) return null;

    const handleGoHome = () => {
        onClearCart();
        navigate('/');
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content text-center p-4">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <img src={graciasImage} alt="Gracias por tu compra" className="img-fluid mb-4" style={{ maxHeight: '300px' }} />
                        <h2 className="display-4 fw-bold text-success">Gracias por tu compra</h2>
                        <p className="lead">Tu pedido ha sido procesado exitosamente.</p>
                    </div>
                    <div className="modal-footer justify-content-center border-0">
                        <button type="button" className="btn btn-primary btn-lg px-5" onClick={handleGoHome}>
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
