import React from 'react'
import styled from 'styled-components/macro'
import { useLocation } from 'react-router'

import Dashboard from './styled/Dashboard'

import utils from 'utils'

const NavbarContainer = styled.nav`
    width: 100%;
    height: 80px;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
`

const Navbar = ({ links }) => {
    const location = useLocation()
    return (
        <NavbarContainer>
            <Dashboard.Brand>evo4x</Dashboard.Brand>
            <Dashboard.Links>
                {links.map(({ link, pathname, onClick }) => (
                    <Dashboard.Link
                        onClick={onClick ? onClick : () => utils.history.push(pathname)}
                        active={pathname === location.pathname}
                    >
                        {link}
                    </Dashboard.Link>
                ))}
            </Dashboard.Links>
        </NavbarContainer>
    )
}

export default Navbar
