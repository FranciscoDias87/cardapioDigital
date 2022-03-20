import './style.css';
import Logo from '../../assets/logo1.png';

function Header(){
    
    return <div className='header'>
        <div className='logo'>
            <img src={Logo} alt="Gellats Lanches" />
            <h3>Gellats Lanches</h3>
        </div>
    </div>
}

export default Header;