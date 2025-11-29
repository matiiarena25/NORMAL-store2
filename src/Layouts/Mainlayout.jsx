import { Outlet } from "react-router-dom";

export const Mainlayout = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};