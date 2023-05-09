import React, { useState } from 'react'
import NavList from './NavList'
import NavButton from './NavButton'

const NavBar = ({ accounts, setAccounts }) => {
    const [isShow, setIsShow] = useState(false)

    const handleClick = () => {
        setIsShow(prev => !prev)
    }

    return (
        <nav className='navBar'>
            <NavButton
                accounts={accounts}
                handleClick={handleClick}
            />
            <NavList
                accounts={accounts}
                setAccounts={setAccounts}
                isShow={isShow}
                handleClick={handleClick}
            />
        </nav>
    )
}

export default NavBar