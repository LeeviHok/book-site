import { Routes, Route } from 'react-router-dom';

import MainLayout from './MainLayout';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';

function Layout() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default Layout;
