import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../context/AuthContext/useAuth';



const Login = () => {
    const [userForm, setUserForm] = useState({
        name: 'Admin',
        password: '1234',
    });
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) { return <Navigate to="/admin" replace />; }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(userForm.name, userForm.password);
        if (result) {
            navigate('/admin');
        } else {
            setError('Usuario o contraseña incorrectos');
            alert('Usuario o contraseña incorrectos');
            setUserForm({ name: '', password: '' });
        }
    };



    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Usuario / Email</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        value={userForm.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={userForm.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                            </form>
                            <div className="mt-3 text-center">
                                <p className="text-muted small">Por defecto: Admin / 1234</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
