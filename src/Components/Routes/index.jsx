import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../../Pages/Category';
import Home from '../../Pages/Home';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Category />}></Route>
                <Route path='/:categoryId' element={<Category />}>Category Page</Route>

            </Routes>
        </div>
    );
}

export default AppRoutes;
