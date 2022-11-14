import {Link} from 'react-router-dom';
import {useState} from 'react';
export default function Navbar() {
    const [navToggled, setNavToggled] = useState<boolean>(false);
    return (
        <nav className={navToggled ? 'navToggled' : ''}>
            <div className="logo">
                <Link to={'/'}>BISS</Link>
            </div>
            <div className="links">
                <Link to={'/'}>Link</Link>
                <Link to={'/'}>Link</Link>
                <Link to={'/'}>Link</Link>
                <Link to={'/'}>Link</Link>
                <Link to={'/'}>Link</Link>
            </div>
            <div
                className="toggleBtn"
                onClick={() => setNavToggled(!navToggled)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    );
}
