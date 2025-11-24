import { Link } from 'react-router-dom';
import useAuth from '../context/AuthContext/useAuth';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="container mt-2">
            <div className="p-3 mb-2 card rounded-3 text-center">
                <div className="container-fluid py-2">
                    <h1 className="display-6 fw-bold">Bienvenido a</h1>
                    <h1 className="display-2 fw-bold text-primary text-normal-highlight">NORMAL</h1>
                    <h1 className="display-6 fw-bold mb-3">Tech Store</h1>
                    <p className="col-md-8 fs-5 mx-auto">Encuentra los mejores gadgets a precios normales.</p>
                    <div className="d-flex justify-content-center gap-2">
                        <Link className="btn btn-primary" to="/products">Comprar Ahora</Link>
                        {user && user.role === 'admin' && (
                            <Link className="btn btn-outline-secondary" to="/admin">Modificar o Agregar productos</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
