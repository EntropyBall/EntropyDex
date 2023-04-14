import React from 'react'

const NavItem = ({ name, team, selected }) => {
    return (
        <li className='nav-itemAccount' onClick={selected = true}>
            <span>{team} {name}</span>
        </li>
    )
}

export default NavItem