import type { ReactNode } from 'react';
import Header from '../UI/header/Header';
import Footer from '../UI/Footer';

/**
 * Header and Footer used on all pages 
 * with sign in conditional feature 
 * depending on connection state.
 * @param 
 * children is the main, 
 * logIn means user has the log in functionality (is logged out at page display).
 *     See Header component for complete explanations.
 * @returns Argent Bank header and footer common visuals
 */
const Layout = ({ children, signIn }: { children: ReactNode, signIn: boolean }) => (
    <>
        <Header logIn={signIn}/>
        { children }
        <Footer />
    </>
);

export default Layout;