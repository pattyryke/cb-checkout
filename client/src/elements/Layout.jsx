import React from "react";
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
    return(
        <div id='nav-bar'>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/check-in">Chromebook Check In</Link>
                    </li>
                    <li>
                        <Link to="/check-out">Chromebook Check Out</Link>
                    </li>
                    <li>
                        <Link to="/display">Database</Link>
                    </li>
                    <li>
                        <Link to="/account">Account Info</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}
export default Layout;