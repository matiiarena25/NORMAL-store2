import useCart from '../context/CartContext/useCart';

const Notification = () => {
    const { notifications } = useCart();

    if (notifications.length === 0) return null;

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className="d-flex flex-column gap-2">
                {notifications.map(note => (
                    <div key={note.id} className="toast show align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{ minWidth: '300px' }}>
                        <div className="d-flex">
                            <div className="toast-body fs-5 py-3">
                                {note.message}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
