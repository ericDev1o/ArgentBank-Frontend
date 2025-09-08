import HeaderLogin from './HeaderLogin'
import HeaderLogout from './HeaderLogout'
import { getToken } from '@/app/selectors';

export default function Header() {
    const token = getToken()

    return <header>
         <nav className='
            main-nav 
            display-flex 
            justify-content-space-between 
            align-items-center'
        >
            <a className='
                main-nav-logo 
                color-blue 
                font-weight-bold 
                align-items-center' 
                href='/'
            >
                <img
                    className='main-nav-logo-image width-200px'
                    src='/img/argentBankLogo.avif'
                    alt='Argent Bank Logo'
                    aria-hidden='true'
                    width='200px'
                    height='54px'
                    loading='lazy'
                />
                <h1 className='sr-only padding-0'>Argent Bank</h1>
            </a>
            { token ?
            <HeaderLogout />
            :
            <HeaderLogin />
            }
        </nav>
    </header>
}