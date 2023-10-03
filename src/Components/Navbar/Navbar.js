// importing Navbar styles
import styles from './Navbar.module.css';

// creating Navbar componnet
const Navbar = ()=>{

    return(
        <>
        <div className={styles.navbar}>
            <img src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png" alt="logo"/>
            <h3>PhotoFolio</h3>
        </div>
        </>
    )
}

export default Navbar;