import styled from 'styled-components/macro'

import AnalysisModule from './modules/Analysis'

import * as StyledChat from 'components/user/Chat/styled'

import { useAnalysis } from './hooks'

const AnalysisContainer = styled.section`
    height: 100%;
`
const Analysis = () => {
    const { analysisRef, analysis, getAnalysis } = useAnalysis()
    const areThereAnalysis = !!analysis.length
    return (
        <AnalysisContainer>
            <StyledChat.Content withAnalysis>
                <StyledChat.Messages
                    ref={analysisRef}
                    onScroll={event =>
                        getAnalysis({
                            event,
                            limit: 20,
                            offset: analysis.length
                        })
                    }
                >
                    {areThereAnalysis ? (
                        analysis.map((currentAnalysis, index) => (
                            <AnalysisModule
                                key={currentAnalysis.id}
                                analysis={currentAnalysis}
                                nextAnalysis={analysis[index + 1]}
                            />
                        ))
                    ) : (
                        <StyledChat.Warning>There are no analysis yet</StyledChat.Warning>
                    )}
                </StyledChat.Messages>
            </StyledChat.Content>
        </AnalysisContainer>
    )
}

export default Analysis
