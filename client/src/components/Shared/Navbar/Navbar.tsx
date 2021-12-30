import React, { useState } from 'react'
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
    z-index: 2;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding: 0px 30px;
        height: 65px;
    }
`

interface INavbar {
    links: NavbarLink[]
    hamburger?: boolean
}

const Navbar: React.FC<INavbar> = ({ links, hamburger }) => {
    const location = useLocation()
    const [toggleHamburger, setToggleHamburger] = useState(false)
    const withHamburger = hamburger && toggleHamburger
    return (
        <NavbarContainer>
            <Dashboard.Brand>evo4x</Dashboard.Brand>
            {hamburger && (
                <Dashboard.Hamburger
                    onClick={() => setToggleHamburger(toggleHamburger => !toggleHamburger)}
                    withHamburger={withHamburger}
                >
                    <Dashboard.Line withHamburger={withHamburger} />
                    <Dashboard.Line withHamburger={withHamburger} />
                    <Dashboard.Line withHamburger={withHamburger} />
                </Dashboard.Hamburger>
            )}
            <Dashboard.Menu withHamburger={withHamburger}>
                {links.map(({ link, pathname, counter, onClick }) => (
                    <Dashboard.Link
                        key={link}
                        onClick={onClick ? onClick : () => utils.history.push(pathname!)}
                        active={pathname === location.pathname}
                        counter={counter}
                        withHamburger={withHamburger}
                    >
                        {link}
                    </Dashboard.Link>
                ))}
            </Dashboard.Menu>
            <Dashboard.Links hamburger={hamburger}>
                {links.map(({ link, pathname, counter, onClick }) => (
                    <Dashboard.Link
                        key={link}
                        onClick={onClick ? onClick : () => utils.history.push(pathname!)}
                        active={pathname === location.pathname}
                        counter={counter}
                    >
                        {link}
                    </Dashboard.Link>
                ))}
            </Dashboard.Links>
        </NavbarContainer>
    )
}

export default Navbar
