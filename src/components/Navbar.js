import React from 'react';

import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
    <>
       
        <nav>
        <div className='menuitem'>

                <Link to='/'>Home</Link>    
                <Link to='/Products'>Products</Link>    
                <Link to='/About'>About</Link>
            
        </div>
        </nav>
    </>
    )
}

export default NavBar
