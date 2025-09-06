import type { ReactNode } from 'react';
import Header from '../UI/header/Header';
import Footer from '../UI/Footer';

const Layout = ({ children }: { children: ReactNode }) => (
    <>
        <Header />
        { children }
        <Footer />
    </>
);

export default Layout;