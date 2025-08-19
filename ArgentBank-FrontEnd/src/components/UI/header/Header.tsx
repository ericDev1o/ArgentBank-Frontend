import HeaderLogin from "./HeaderLogin"
import HeaderLogout from "./HeaderLogout"

/**
 * Header with connected state functionality
 * @param logIn: true when user can log in, 
 * in other words true when user is logged out
 * @returns the header with its common part and either
 *     sign in nav link when user is logged out 
 *         and can therefore use the log in functionality (logIn = true)
 *     sign out nav link when user is logged in 
 *         (logIn = false meaning display of log out functionality)
 */
export default function Header({logIn}: {logIn: boolean}) {
    return <header>
         <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                className="main-nav-logo-image"
                src="/img/argentBankLogo.webp"
                alt="Argent Bank logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            { logIn ?
            <HeaderLogin />
            :
            <HeaderLogout />
            }
        </nav>
    </header>
}