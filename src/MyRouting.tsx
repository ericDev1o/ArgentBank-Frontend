import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Error404 from './pages/Error404';

const MyRouting = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/user/:userId' element={<User />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    </BrowserRouter>
);

export default MyRouting;