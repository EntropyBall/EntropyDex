import React, { useState } from 'react'
import NavList from './NavList'
import NavButton from './NavButton'

const NavBar = () => {
    const [isShow, setIsShow] = useState(false)

    const handleClick = () => {
        // set clicked one to true the other to false
        setIsShow(prev => !prev)
    }

    return (
        <nav className='navBar'>
            <NavButton handleClick={handleClick} />
            <NavList isShow={isShow} handleClick={handleClick} />
        </nav>
    )
}

export default NavBar