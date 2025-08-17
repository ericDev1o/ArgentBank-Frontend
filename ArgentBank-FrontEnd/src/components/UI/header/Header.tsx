import HeaderCommon from "./HeaderCommon"
import HeaderLogin from "./HeaderLogin"
import HeaderLogout from "./HeaderLogout"

export default function Header({logIn}: {logIn: boolean}) {
    return <header>
         <nav className="main-nav">
            <HeaderCommon />
            { logIn ?
            <HeaderLogin />
            :
            <HeaderLogout />
            }
        </nav>
    </header>
}