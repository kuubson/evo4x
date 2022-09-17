import { useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components/macro'

import * as Styled from './styled'

import { history } from 'utils'

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

const Navbar = ({ links, hamburger }: INavbar) => {
   const location = useLocation()
   const [toggleHamburger, setToggleHamburger] = useState(false)
   const withHamburger = hamburger && toggleHamburger
   return (
      <NavbarContainer>
         <Styled.Brand>evo4x</Styled.Brand>
         {hamburger && (
            <Styled.Hamburger
               onClick={() => setToggleHamburger(toggleHamburger => !toggleHamburger)}
               withHamburger={withHamburger}
            >
               <Styled.Line withHamburger={withHamburger} />
               <Styled.Line withHamburger={withHamburger} />
               <Styled.Line withHamburger={withHamburger} />
            </Styled.Hamburger>
         )}
         <Styled.Menu withHamburger={withHamburger}>
            {links.map(({ link, pathname, counter, onClick }) => (
               <Styled.Link
                  key={link}
                  onClick={onClick ? onClick : () => history.push(pathname!)}
                  active={pathname === location.pathname}
                  counter={counter}
                  withHamburger={withHamburger}
               >
                  {link}
               </Styled.Link>
            ))}
         </Styled.Menu>
         <Styled.Links hamburger={hamburger}>
            {links.map(({ link, pathname, counter, onClick }) => (
               <Styled.Link
                  key={link}
                  onClick={onClick ? onClick : () => history.push(pathname!)}
                  active={pathname === location.pathname}
                  counter={counter}
               >
                  {link}
               </Styled.Link>
            ))}
         </Styled.Links>
      </NavbarContainer>
   )
}

export default Navbar
