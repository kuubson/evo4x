import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 100%;
    height: 100%;
    padding: 0px 0px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding: 0px 0px 20px 15px;
    }
    ${({ withAnalysis }) =>
        withAnalysis
            ? css`
                  padding-bottom: 10px;
                  @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
                      padding-bottom: 10px;
                  }
              `
            : null}
`
