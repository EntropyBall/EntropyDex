import React from 'react'

const NavButton = ({ accounts, handleClick }) => {
    const { name, team } = accounts.find(account => account.selected)
    return (
        <button className='nav-buttonAccount' onClick={handleClick}><span>{team} {name}</span></button>
    )
}

export default NavButton