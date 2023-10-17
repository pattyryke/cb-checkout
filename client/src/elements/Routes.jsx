import React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import CheckIn from '../pages/CheckIn';
import CheckOut from '../pages/CheckOut';


export function RoutesElement() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/check-in' element={<CheckIn />} />
            <Route path='/check-out' element={<CheckOut />} />
            <Route path='/check-out' element={<CheckOut />} />
        </Routes>
    );
}

export default RoutesElement;