import styled from 'styled-components/macro'

import { BlackLayer } from 'components/shared/styledComponents'
import * as Dashboard from './styled/Dashboard'

import Logo from 'assets/images/Logo.png'

import { useLoader } from 'hooks'

const LoaderContainer = styled(BlackLayer)`
    position: fixed;
    z-index: 4;
`

const Loader = () => {
    const { loading } = useLoader()
    return (
        <LoaderContainer showLayer={loading}>
            <Dashboard.Logo src={Logo} $loading={loading} />
        </LoaderContainer>
    )
}

export default Loader
