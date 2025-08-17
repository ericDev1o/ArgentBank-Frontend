import type { ReactNode } from 'react';
import Header from '../UI/header/Header';
import Footer from '../UI/Footer';

const Layout = ({ children, logIn }: { children: ReactNode, logIn: boolean }) => (
    <>
        <Header logIn={logIn}/>
        { children }
        <Footer />
    </>
);

export default Layout;