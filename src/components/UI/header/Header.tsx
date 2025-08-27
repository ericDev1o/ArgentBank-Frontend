import HeaderLogin from "./HeaderLogin"
import HeaderLogout from "./HeaderLogout"

export default function Header({logIn}: {logIn: boolean}) {
    return <header>
         <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                className="main-nav-logo-image"
                src="/img/argentBankLogo.avif"
                alt="Argent Bank Logo"
                aria-hidden="true"
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