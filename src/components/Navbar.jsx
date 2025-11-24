<ul className="navbar-nav ms-auto align-items-center">
    <li className="nav-item">
        <Link className="nav-link" to="/">Inicio</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/products">Productos</Link>
    </li>
    {user && user.role === 'admin' && (
        <li className="nav-item">
            <Link className="nav-link" to="/admin">Panel Admin</Link>
        </li>
    )}
    <li className="nav-item">
        <Link className="nav-link position-relative" to="/cart">
            <FaShoppingCart />
            {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
            )}
        </Link>
    </li>
    <li className="nav-item mx-2">
        <button className="btn btn-link nav-link" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    </li>
    {user ? (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <FaUser /> {user.name}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
            </ul>
        </li>
    ) : (
        /* Login button removed as per request */
        null
    )}
</ul>
            </div >
        </div >
    </nav >
);
};

export default Navbar;
