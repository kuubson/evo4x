import styled from 'styled-components/macro'

import Logo from 'assets/images/Logo.png'

import * as Styled from './styled'

import { BlackLayer } from 'components/shared/styledComponents'

import { useLoader } from 'hooks'

const LoaderContainer = styled(BlackLayer)`
   position: fixed;
   z-index: 4;
`

const Loader = () => {
   const { loading } = useLoader()
   return (
      <LoaderContainer showLayer={loading}>
         <Styled.Logo src={Logo} $loading={loading} />
      </LoaderContainer>
   )
}

export default Loader
