import HeaderLogin from './HeaderLogin'
import HeaderLogout from './HeaderLogout'
import { getToken } from '@/app/selectors';

export default function Header() {
    const token = getToken()

    return <header>
         <nav className='main-nav'>
            <a className='main-nav-logo' href='/'>
                <img
                    className='main-nav-logo-image'
                    src='/img/argentBankLogo.avif'
                    alt='Argent Bank Logo'
                    aria-hidden='true'
                    width='200px'
                    height='54px'
                    loading='lazy'
                />
                <h1 className='sr-only'>Argent Bank</h1>
            </a>
            { token ?
            <HeaderLogout />
            :
            <HeaderLogin />
            }
        </nav>
    </header>
}