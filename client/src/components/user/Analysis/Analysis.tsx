import styled from 'styled-components/macro'

import AnalysisModule from './modules/Analysis'

import * as ChatDashboard from 'components/user/Chat/styled/Dashboard'

import { useAnalysis } from './hooks'

const AnalysisContainer = styled.section`
    height: 100%;
`
const Analysis = () => {
    const { analysisRef, analysis, getAnalysis } = useAnalysis()
    const areThereAnalysis = !!analysis.length
    return (
        <AnalysisContainer>
            <ChatDashboard.Content withAnalysis>
                <ChatDashboard.Messages
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
                        <ChatDashboard.Warning>There are no analysis yet</ChatDashboard.Warning>
                    )}
                </ChatDashboard.Messages>
            </ChatDashboard.Content>
        </AnalysisContainer>
    )
}

export default Analysis
